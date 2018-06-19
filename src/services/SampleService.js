import { inject } from 'aurelia-dependency-injection'
import loggerFactory from '../lib/services/loggerFactory'

// initializes a logger instance with context of 'SampleService'
const logger = loggerFactory('SampleService')

const SAMPLE_DYNAMO_TABLE = 'sampleTableName'

// @inject decorator specifies which dependencies are expected to be
// injected into the SampleService instance through the constructor from the DI container
// in this case, SampleService depends on the EnvVarsManager, DynamoDB and S3 services
@inject('EnvVarsManager', 'DynamoDB', 'S3')
export default class SampleService {
  constructor(envVarsManager, dynamoDB, s3) {
    this.envVarsManager = envVarsManager
    this.dynamoDB = dynamoDB
    this.s3 = s3
  }

  // retrieves the value of an env var by key using the EnvVarsManager service
  getEnvVar(key) {
    return this.envVarsManager.get(key)
  }

  // illustrates the execution of a simple DynamoDB operation using the DynamoDB service
  async sampleDynamoCall(sampleId) {
    // params payload to pass to the call operation
    const params = {
      TableName: this.envVarsManager.get(SAMPLE_DYNAMO_TABLE),
      Key: {
        sampleId
      }
    }

    logger.debug('Getting sample data with params: ', params)
    return this.dynamoDB.call('get', params)
  }

  // illustrates the execution of a simple S3 operation using the S3 service
  async sampleS3Operation(bucket, objectKey) {
    const params = {
      Bucket: bucket,
      Key: objectKey
    }
    logger.debug('Getting metadata from object S3 object:', params)
    return this.s3.call('headObject', params)
  }
}
