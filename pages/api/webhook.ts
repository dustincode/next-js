// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

type Data = {
  message: string;
};

const storeEventObject = async (req: NextApiRequest) => {
  const { headers, cookies, query, body } = req;
  const { error } = await supabase.from('fireblocks_webhook').insert([
    {
      headers,
      cookie: cookies,
      query,
      body,
    },
  ]);
  console.log('Error: ', error);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { body } = req;
  await storeEventObject(req);
  if (body?.type === 'TRANSACTION_STATUS_UPDATED') {
    return res.status(400).json({ message: 'Bad Request' });
  } else {
    return res.status(200).json({ message: 'OK' });
  }
}
