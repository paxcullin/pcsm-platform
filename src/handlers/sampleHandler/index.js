import { Container } from 'aurelia-dependency-injection'
import { init } from '../../lib/initFunction'
import SampleHandler from './SampleHandler'
import DynamoDB from '../../lib/services/aws/DynamoDB'
import S3 from '../../lib/services/aws/S3'
import EnvVarsManager from '../../lib/services/EnvVarsManager'
import SampleService from '../../services/SampleService'

export default init('SampleHandler', new Container(), container => {
  container.registerSingleton('EnvVarsManager', EnvVarsManager)
  container.registerSingleton('DynamoDB', DynamoDB)
  container.registerSingleton('S3', S3)
  container.registerSingleton('SampleService', SampleService)
  container.registerSingleton('SampleHandler', SampleHandler)
})
