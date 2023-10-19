import nodemailer from 'nodemailer'

export const sendMail = async (to: string, subject: string, text: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ionos.es',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD
    }
  })

  const info = await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to,
    subject,
    text
  })

  console.log('Message sent: %s', info.messageId)
}
