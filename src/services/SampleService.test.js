import SampleService from './SampleService'

describe('SampleService', () => {
  let service
  let mockEnvVarsManager, mockDynamoDB, mockS3

  const testKey = 'sampleTableName'
  const expectedTableName = 'sample_dynamo_table'

  beforeEach(() => {
    mockEnvVarsManager = {
      get: jest.fn(key => {
        if (key === testKey) return expectedTableName
        return ''
      })
    }
    mockDynamoDB = {
      call: jest.fn(() => Promise.resolve())
    }
    mockS3 = {
      call: jest.fn(() => Promise.resolve())
    }
    service = new SampleService(mockEnvVarsManager, mockDynamoDB, mockS3)
  })

  describe('when getEnvVar() is executed', () => {
    it('should return expected env var value for given key', () => {
      let result = service.getEnvVar(testKey)
      expect(mockEnvVarsManager.get).toHaveBeenCalledWith(testKey)
      expect(result).toEqual(expectedTableName)
    })
  })

  describe('when sampleDynamoCall() is executed', () => {
    it('should call DynamoDB service with expected parameters', async () => {
      const testSampleId = 'foo'
      const expectedParams = { Key: { sampleId: testSampleId }, TableName: expectedTableName }
      await service.sampleDynamoCall(testSampleId)
      expect(mockDynamoDB.call.mock.calls[0][0]).toEqual('get')
      expect(mockDynamoDB.call.mock.calls[0][1]).toEqual(expectedParams)
    })
  })

  describe('when sampleS3Operation() is executed', () => {
    it('should call S3 service with expected parameters', async () => {
      const testBucket = 'foo'
      const testObjectKey = 'bar'
      const expectedParams = { Bucket: testBucket, Key: testObjectKey }
      await service.sampleS3Operation(testBucket, testObjectKey)
      expect(mockS3.call.mock.calls[0][0]).toEqual('headObject')
      expect(mockS3.call.mock.calls[0][1]).toEqual(expectedParams)
    })
  })
})
