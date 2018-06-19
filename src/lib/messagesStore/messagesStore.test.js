import messages, { getFormattedMessage, getErrorObj } from './'

describe('messagesStore', () => {
  let testMessages
  beforeEach(() => {
    testMessages = Object.assign({}, messages, {
      ERR_TEST_ERROR: { name: 'TestError', message: 'this is my error with string %s and number %d' }
    })
  })

  describe('when getFormattedMessage() is called', () => {
    it('should return formated message', () => {
      const msg = getFormattedMessage(testMessages.ERR_TEST_ERROR, 'my_string', 102)
      expect(msg).toEqual('this is my error with string my_string and number 102')
    })

    it('should return plain message if formatting arguments are not passed', () => {
      const msg = getFormattedMessage(testMessages.ERR_TEST_ERROR)
      expect(msg).toEqual('this is my error with string %s and number %d')
    })
  })

  describe('when getErrorObj() is called', () => {
    it('should return error instance with error name', () => {
      const err = getErrorObj(testMessages.ERR_TEST_ERROR)
      expect(err).toBeInstanceOf(Error)
      expect(err.name).toEqual('TestError')
    })

    it('should return error instance with formated error message', () => {
      const err = getErrorObj(testMessages.ERR_TEST_ERROR, 'my_string', 102)
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toEqual('this is my error with string my_string and number 102')
    })

    it('should return error instance with plain error message if formatting arguments are not passed', () => {
      const err = getErrorObj(testMessages.ERR_TEST_ERROR)
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toEqual('this is my error with string %s and number %d')
    })
  })
})
