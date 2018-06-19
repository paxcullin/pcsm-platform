import AWS from 'aws-sdk'

const stepFunctions = new AWS.StepFunctions()

export default class StepFunctions {
  call(action, params) {
    return stepFunctions[action](params).promise()
  }
}
