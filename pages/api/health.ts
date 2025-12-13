import type { NextApiRequest, NextApiResponse } from 'next'

interface HealthResponse {
  status: string
  service: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  const serviceName = process.env.SERVICE_NAME || 'blackroad-os-home'

  if (req.method && req.method !== 'GET') {
    res.setHeader('Allow', 'GET')

    return res.status(405).json({
      status: 'method_not_allowed',
      service: serviceName
    })
  }

  res.setHeader('Cache-Control', 'no-store')

  res.status(200).json({
    status: 'ok',
    service: serviceName
  })
}
