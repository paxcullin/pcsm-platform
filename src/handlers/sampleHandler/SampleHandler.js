import { inject } from 'aurelia-dependency-injection'
import { success } from '../../lib/apigLambdaProxyHelper'
import BaseHandler from '../../lib/handler/BaseHandler'

@inject('SampleService')
export default class SampleHandler extends BaseHandler {
  constructor(sampleService) {
    super()
    this.sampleService = sampleService
  }

  async _process(event, context) {
    this.logger.debug(`event: ${JSON.stringify(event)}`)
    const body = JSON.parse(event.body)
    const validationErrorMessage = 'Event payload validation error'
    if (!body.bucket) {
      const message = `${validationErrorMessage}: 'bucket' property was not defined`
      this.logger.error(message)
      throw new Error(message)
    }
    if (!body.object) {
      const message = `${validationErrorMessage}: 'object' property was not defined`
      this.logger.error(message)
      throw new Error(message)
    }
    this.logger.debug(`Listing metadata for S3 object: "${body.bucket}/${body.object}"`)
    const response = await this.sampleService.sampleS3Operation(body.bucket, body.object)
    return success(response)
  }
}
