import util from 'util'

const messages = {
  MSG_DEFAULT: { name: 'DefaultMessage', message: 'This is a default message' },
  ERR_INVALID_JSON_IN_REQUEST_BODY: { name: 'InvalidJsonInRequestBodyError', message: 'Invalid JSON in request body' },
  ERR_INTERNAL_SERVER_ERROR: { name: 'InternalServerError', message: 'Internal Server Error' }
}

export default messages

export function getFormattedMessage(messageObj, ...args) {
  const message = messageObj.message
  return util.format(message, ...args)
}

export function getErrorObj(messageObj, ...args) {
  function CustomError(name, message) {
    this.name = name
    this.message = message
  }

  CustomError.prototype = new Error()

  let message = getFormattedMessage(messageObj, ...args)
  const err = new CustomError(messageObj.name, message)
  return err
}
