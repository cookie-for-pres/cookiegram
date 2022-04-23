import type { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import requestIp from 'request-ip';
import nodemailer from 'nodemailer';
import { v4 } from 'uuid';

import Account from '../../models/Account';

import db from '../../lib/db';

type Data = {
  message: string;
  success: boolean;
};

const otp = (length: number) => {
  let result = '';
  let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const signup = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: 'method not allowed', success: false });
  }

  const { username, email, password, firstName, lastName } = req.body;
  const ip = requestIp.getClientIp(req);

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'please fill in all fields', success: false });
  }

  await db();

  const usernameCheck = await Account.findOne({ username });
  const emailCheck = await Account.findOne({ email });

  if (usernameCheck) {
    return res
      .status(400)
      .json({ message: 'username already exists', success: false });
  } else if (emailCheck) {
    return res
      .status(400)
      .json({ message: 'email already exists', success: false });
  }

  const salt = await bcryptjs.genSalt(12);
  const passwordHash = await bcryptjs.hash(password, salt);
  const code = otp(6);
  const key = v4().replace(/-/g, '');

  const account = new Account({
    _id: v4(),
    username,
    email,
    password: passwordHash,
    key,
    type: 'member',
    knownIPs: [ip],
    personal: {
      firstName,
      lastName,
    }
  });

  try {
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
      to: email,
      subject: 'Welcome!',
      text: `As of now, you CookieGram is in development but now that you have signed up you get a nice "Beta Tester" badge next to your name whenever CookieGram drops.`,
    };

    transporter.sendMail(options, async (error) => {
      if (error) {
        console.log(error);

        return res
          .status(400)
          .json({ message: 'error creating account', success: false });
      } 
    });

    const date = new Date();
    if (date.getMonth() < 4) {
      account.personal.badges.push('beta tester');
    }

    await account.save();
    return res.json({ message: 'account created', success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: 'error creating account', success: false });
  }
};

export default signup;