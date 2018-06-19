/**
 * Provides helper functions to simplify integration with API Gateway requests/responses.
 */
import { get, isNil } from 'lodash'

export function extractBody(request) {
  const bodyString = get(request, 'body')
  if (bodyString) {
    return JSON.parse(bodyString)
  }
  return undefined
}

export function extractHeaders(request) {
  const params = get(request, 'headers')
  if (isNil(params)) {
    return {}
  } else {
    return params
  }
}

export function extractQueryStringParameters(request) {
  const params = get(request, 'queryStringParameters')
  if (isNil(params)) {
    return {}
  } else {
    return params
  }
}

export function extractPathParameters(request) {
  const params = get(request, 'pathParameters')
  if (isNil(params)) {
    return {}
  } else {
    return params
  }
}

export function success(body) {
  return buildResponse(200, { data: body })
}

export function failure400(code, message) {
  return buildFailure(400, code, message)
}

export function failure401(body) {
  return buildFailure(401, body)
}
export function failure404(code, message) {
  return buildFailure(404, code, message)
}

export function failure500(code, message) {
  return buildFailure(500, code, message)
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(body)
  }
}

function buildFailure(httpStatusCode, code, message) {
  return buildResponse(httpStatusCode, {
    error: {
      code,
      message
    }
  })
}
