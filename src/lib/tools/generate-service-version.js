const json = require('../../../package.json')
const version = json['version'].match(/(\d+)\.(\d+)\.(\d)/)
console.log(`${version[1]}.${version[2]}.${getDateString()}.${process.argv[2]}`)

function padNumberString(number) {
  return `${number < 10 ? `0${number}` : number}`
}

function getDateString() {
  const date = new Date()
  return `${padNumberString(date.getFullYear() - 2000)}${padNumberString(date.getMonth() + 1)}${padNumberString(date.getDate())}`
}
