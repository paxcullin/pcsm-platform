import AWS from 'aws-sdk'

const lambda = new AWS.Lambda()

export default class Lambda {
  call(action, params) {
    return lambda[action](params).promise()
  }
}
