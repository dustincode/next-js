// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log('Headers:', req.headers);
  console.log('Cookie:', req.cookies);
  console.log('Query: ', req.query);
  console.log('Body:', req.body);
  res.status(204).json({ name: 'Dustin Ng' });
}
