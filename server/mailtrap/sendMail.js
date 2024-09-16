import { MailtrapClient } from 'mailtrap'
import dotenv from 'dotenv'
dotenv.config()
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from './emailTemplate.js'

// # check #pictures/ for mailtrap setup -> https://mailtrap.io/blog/send-emails-with-nodejs/#Send-emails-using-API
const client = new MailtrapClient({
  token: process.env.MAILTRAP_API_TOKEN, // node .\mailtrap\sendMail.js -> since we don't have dotenv package here, we cannot use process.env -> use real token here
})

const sender = {
  email: 'mailtrap@demomailtrap.com',
  name: 'Auth App',
}
const recipients = [
  {
    email: 'hungbui7690@gmail.com',
  },
]

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    await client.send({
      from: sender,
      to: recipients,
      subject: 'Auth App - Verify Your Email',
      // text: 'Verify your email', // text version of the email
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationCode}',
        verificationToken
      ), // html version of the email
      category: 'Email Verification',
    })

    console.log('Verification Email Sent')
  } catch (error) {
    throw new Error('Error sending verification email')
  }
}
