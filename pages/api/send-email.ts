import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

type EmailResponse = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmailResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email } = req.body

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Valid email is required' })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Welcome to Vaulcrypt Waitlist',
    text: `Thank you for joining the Vaulcrypt waitlist! We're excited to have you on board.

We'll keep you updated on our progress and let you know when we're ready to launch.

Best regards,
The Vaulcrypt Team`,
    html: `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4a5568;">Welcome to Vaulcrypt Waitlist!</h1>
        <p>Thank you for joining the Vaulcrypt waitlist! We're excited to have you on board.</p>
        <p>We'll keep you updated on our progress and let you know when we're ready to launch.</p>
        <p>Best regards,<br>The Vaulcrypt Team</p>
      </body>
    </html>`,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ message: 'Failed to send email' })
  }
}