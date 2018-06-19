import ServiceStatusHandler from './ServiceStatusHandler'
import { extractBody } from '../../lib/apigLambdaProxyHelper'

describe('ServiceStatusHandler', () => {
  let handler
  let mockEnvVarsManager
  let context

  beforeEach(() => {
    mockEnvVarsManager = {
      get: jest.fn()
    }
    handler = new ServiceStatusHandler(mockEnvVarsManager)

    context = {}
  })

  it('should return response with service version from environment variable', () => {
    const expectVersion = '1.0.1111'
    mockEnvVarsManager.get.mockReturnValue(expectVersion)
    return handler.execute({}, context).then(response => {
      expect(mockEnvVarsManager.get).toHaveBeenCalledWith('serviceVersion')
      const responseBody = extractBody(response)
      expect(response.statusCode).toEqual(200)
      expect(responseBody.data.version).toEqual(expectVersion)
    })
  })
})
