const https = require('https')
const fs = require('fs')

const config = {
  owner: 'paxcullin',
  repo: 'pcsm-platform',
  auth: `token ${process.env.BuildReleaseToken}`,
  package: '../package.json'
}

const onError = (message, error) => {
  console.error(`Error: ${message}${error ? ':' : ''}`)
  if (error) console.error(error)
  process.exit(1)
}

const onSuccess = message => {
  console.log(`Success! ${message}`)
  process.exit(0)
}

const getReleaseTag = () => {
  const package = require(config.package)

  if (package && package.version) {
    return `v${package.version}`
  } else {
    onError(`Cannot parse package.version from '${packagePath}'`)
  }
}

if (!process.env.BuildReleaseToken) {
  onError("EnvVar 'BuildReleaseToken' not defined. Exiting.")
}

const buildref = process.argv[2] || 'release.tar.gz'
const commitish = process.argv[3] || 'master'
const tag = process.argv[4] || getReleaseTag()

console.log('release-me.js:', buildref, commitish, tag)

const defaultOptions = overrides => {
  const options = {
    hostname: 'api.github.com',
    path: `/repos/${config.owner}/${config.repo}/releases`,
    headers: {
      Authorization: config.auth,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': config.owner
    }
  }

  if (typeof overrides === 'object') {
    Object.keys(overrides).forEach(key => (options[key] = overrides[key]))
  }

  return options
}

const doRequest = (options, body, fn) => {
  return new Promise((resolve, reject) => {
    const request = https.request(options, response => {
      let data = ''
      response.on('data', chunk => (data += chunk))
      response.on('end', () => {
        resolve({
          code: response.statusCode,
          body: JSON.parse(data)
        })
      })
    })

    request.on('error', error => reject(error))

    if (fn) {
      fn(request)
    }

    if (body) {
      request.write(body)
    }

    request.end()
  })
}

const releaseExists = tag => {
  const options = defaultOptions({
    method: 'GET'
  })
  options.path = `${options.path}/tags/${tag}`

  return doRequest(options).then(response => response.code === 200)
}

const makeRelease = (tag, commitish) => {
  const options = defaultOptions({
    method: 'POST',
    'Content-Type': 'application/json'
  })

  const body = {
    tag_name: tag,
    target_commitish: commitish,
    name: tag,
    draft: false,
    prerelease: true
  }

  return doRequest(options, JSON.stringify(body))
}

const uploadBuild = (buildref, uploadUrl) => {
  // "https://uploads.github.com/repos/:owner/:repo/releases/:id/assets{?name,label}"
  const hostname = 'uploads.github.com'
  const prefix = `https://${hostname}`
  const suffix = '{?name,label}'

  let basepath
  if (uploadUrl.startsWith(prefix) && uploadUrl.endsWith(suffix)) {
    basepath = uploadUrl.slice(prefix.length, -1 * suffix.length)
  } else {
    return Promise.reject(new Error(`uploadBuild: Invalid uploadUrl: ${uploadUrl}`))
  }

  const options = defaultOptions({
    hostname: hostname,
    path: `${basepath}?name=${buildref}&label=${buildref}`,
    method: 'POST'
  })

  const body = fs.readFileSync(buildref)
  const uploader = request => {
    request.setHeader('Content-Type', 'application/gzip')
    request.setHeader('Content-Length', body.length)
  }

  return doRequest(options, body, uploader)
}

// Script

releaseExists(tag)
  .then(exists => {
    if (exists) {
      onError(`Release exists, won't re-release: ${tag}`)
    } else {
      makeRelease(tag, commitish)
        .then(response => {
          if (response.code === 201) {
            uploadBuild(buildref, response.body.upload_url)
              .then(response => {
                if (response.code === 201) {
                  onSuccess(`Release: ${tag}`)
                } else {
                  onError(`uploadBuild: response.code: ${response.code}`)
                }
              })
              .catch(error => onError('uploadBuild', error))
          } else {
            onError(`makeRelease: response.code: ${response.code}`)
          }
        })
        .catch(error => onError('makeRelease', error))
    }
  })
  .catch(error => onError('releaseExists', error))
