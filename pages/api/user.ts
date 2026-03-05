import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(501).json({ error: 'Clerk authentication is not enabled' })
}
