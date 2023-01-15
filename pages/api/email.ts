import type { NextApiRequest, NextApiResponse } from 'next';
import { SMTPClient } from 'emailjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, message, subject } = req.body;

  const client = new SMTPClient({
    user: process.env.SENDER_EMAIL,
    password: process.env.SENDER_PASSWORD,
    host: process.env.SENDER_HOST,
    ssl: true
  });

  try {
    // also possible: client.send()
    await client.sendAsync({
      text: message,
      from: process.env.SENDER_EMAIL!,
      to: email,
      subject,
    });
  } catch (e) {
    res.status(400).end(JSON.stringify({ message: "Error" }));
    return;
  }

  res.status(200).end(JSON.stringify({ message: 'Mail was sent successfully' }));
}