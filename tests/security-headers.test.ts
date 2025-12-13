import assert from 'node:assert/strict'
import { test } from 'node:test'

import { securityHeaders } from '../next.config.mjs'

const headerMap = new Map(securityHeaders.map(({ key, value }) => [key, value]))

test('includes core security headers', () => {
  const expectedKeys = [
    'Content-Security-Policy',
    'Referrer-Policy',
    'X-Content-Type-Options',
    'X-Frame-Options',
    'Permissions-Policy',
    'Cross-Origin-Opener-Policy',
    'Cross-Origin-Resource-Policy',
    'Strict-Transport-Security'
  ]

  for (const key of expectedKeys) {
    assert.equal(headerMap.has(key), true, `${key} should be configured`)
  }
})

test('Content Security Policy is restrictive by default', () => {
  const csp = headerMap.get('Content-Security-Policy') || ''

  assert.match(csp, /default-src 'self'/)
  assert.match(csp, /frame-ancestors 'none'/)
  assert.match(csp, /script-src 'self'/)
  assert.match(csp, /img-src 'self' data: https:/)
})
