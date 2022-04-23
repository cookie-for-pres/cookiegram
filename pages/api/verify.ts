import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import Account from '../../models/Account';

import db from '../../lib/db';

type Data = {
  message: string;
  success: boolean;
  data?: any;
};

const verify = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'method not allowed',
      success: false,
    });
  }

  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'invalid token', success: false });
  }

  let decoded: any;

  try {
    // @ts-ignore
    decoded = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'unauthorized', success: false });
  }

  await db();

  const account = await Account.findOne({ _id: decoded._id });

  if (!account) {
    return res
      .status(401)
      .json({ message: 'cant find account', success: false });
  }

  return res.status(200).json({
    message: 'success',
    success: true
  });
};

export default verify;