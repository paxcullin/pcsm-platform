import amazonES from 'http-aws-es'
import elasticsearch from 'elasticsearch'
import AWS from 'aws-sdk'
import loggerFactory from '../loggerFactory'

const logger = loggerFactory('AWS/Elasticsearch')

const credentials = new AWS.EnvironmentCredentials('AWS')

function LogClass() {
  this.error = logger.error.bind(logger)
  this.warning = logger.warn.bind(logger)
  this.info = logger.info.bind(logger)
  this.debug = logger.debug.bind(logger)
  this.trace = (method, request, body, responseBody, responseStatus) => {
    logger.info({
      method: method,
      request: {
        protocol: request.protocol,
        hostname: request.hostname,
        port: request.port,
        path: request.path
      },
      body: body,
      responseBody: responseBody,
      responseStatus: responseStatus
    })
  }
  this.close = () => {}
}

export default class Elasticsearch {
  getClient(elasticsearchURL) {
    return new elasticsearch.Client({
      host: elasticsearchURL,
      log: LogClass,
      connectionClass: amazonES,
      apiVersion: '6.0',
      amazonES: {
        credentials: credentials
      }
    })
  }
}
