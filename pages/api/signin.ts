import type { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import requestIp from 'request-ip';
import nodemailer from 'nodemailer';

import Account from '../../models/Account';

import db from '../../lib/db';

type Data = {
  message: string,
  success: boolean,
  token?: string,
}

const signin = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: 'method not allowed', success: false });
  }
  
  const { username, password } = req.body;
  const ip = requestIp.getClientIp(req);

  if (!username || !password) {
    return res.status(400).json({ message: 'please fill in all fields', success: false });
  }

  await db();

  const account = await Account.findOne({ $or: [{ username }, { email: username }] });

  if (!account) {
    return res.status(400).json({ message: 'account not found', success: false });
  }
  
  const isMatch = await bcryptjs.compare(password, account.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'incorrect password', success: false });
  }

  if (!account.knownIPs.includes(ip)) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const options = {
      from: '"CookieGram 🍪" < ' + process.env.EMAIL_USERNAME + ' >',
      to: account.email,
      subject: 'New login detected!',
      text: `Someone just logged in to your account from ${ip}. If this was you, please ignore this email. If not, please contact us immediately.`,
    };

    transporter.sendMail(options, async (error, info) => {
      if (error) {
        console.log(error);
      } else {
        await account.save();
      }
    });

    account.knownIPs.push(ip);
    await account.save();
  }

  // @ts-ignore
  const token = jwt.sign({ _id: account._id }, process.env.JWT_SECRET);

  return res.status(200).json({ message: 'account signed in', success: true, token });
};

export default signin;