import assert from 'node:assert/strict'
import { test } from 'node:test'
import type { NextApiRequest, NextApiResponse } from 'next'

import handler from '../pages/api/health'

interface MockResponse extends NextApiResponse {
  getStatus: () => number
  getBody: () => unknown
  getHeader: (key: string) => string | undefined
}

const createMockResponse = (): MockResponse => {
  let statusCode = 200
  let body: unknown
  const headers: Record<string, string> = {}

  const response: Partial<MockResponse> = {
    status: (code: number) => {
      statusCode = code
      return response as MockResponse
    },
    json: (payload: unknown) => {
      body = payload
      return response as MockResponse
    },
    setHeader: (key: string, value: string | string[]) => {
      headers[key] = Array.isArray(value) ? value.join(', ') : value
      return response as MockResponse
    },
    getStatus: () => statusCode,
    getBody: () => body,
    getHeader: (key: string) => headers[key]
  }

  return response as MockResponse
}

test('returns ok status and service name for GET', async () => {
  const res = createMockResponse()

  await handler({ method: 'GET' } as NextApiRequest, res)

  assert.equal(res.getStatus(), 200)

  const payload = res.getBody() as { status: string; service: string }
  assert.equal(payload.status, 'ok')
  assert.equal(payload.service, 'blackroad-os-home')
  assert.equal(res.getHeader('Cache-Control'), 'no-store')
})

test('rejects unsupported methods', async () => {
  const res = createMockResponse()

  await handler({ method: 'POST' } as NextApiRequest, res)

  assert.equal(res.getStatus(), 405)

  const payload = res.getBody() as { status: string; service: string }
  assert.equal(payload.status, 'method_not_allowed')
  assert.equal(payload.service, 'blackroad-os-home')
  assert.equal(res.getHeader('Allow'), 'GET')
})
