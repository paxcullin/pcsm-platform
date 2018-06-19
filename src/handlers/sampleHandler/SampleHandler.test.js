import SampleHandler from './SampleHandler'

describe('SampleHandler', () => {
  let handler
  let mockSampleService
  let event, context

  beforeEach(() => {
    mockSampleService = {
      sampleS3Operation: jest.fn(() => Promise.resolve())
    }
    handler = new SampleHandler(mockSampleService)
    event = {
      body: '{\n    "bucket": "foo",\n    "object": "bar"\n}'
    }
    context = {}
  })

  it('should fail when S3 bucket not defined in event payload', async () => {
    try {
      event.body = '{\n    "object": "bar"\n}'
      await handler.execute(event, context)
    } catch (error) {
      expect(error.message).toEqual(`Event payload validation error: 'bucket' property was not defined`)
      expect(mockSampleService.sampleS3Operation).not.toHaveBeenCalled()
    }
  })

  it('should fail when S3 object not defined in event payload', async () => {
    try {
      event.body = '{\n    "bucket": "foo"\n}'
      await handler.execute(event, context)
    } catch (error) {
      expect(error.message).toEqual(`Event payload validation error: 'object' property was not defined`)
      expect(mockSampleService.sampleS3Operation).not.toHaveBeenCalled()
    }
  })

  it('should call sampleS3Operation() with the bucket and object from the event', async () => {
    await handler.execute(event, context)
    const body = JSON.parse(event.body)
    expect(mockSampleService.sampleS3Operation).toHaveBeenCalledWith(body.bucket, body.object)
  })
})
