import { MailtrapClient } from 'mailtrap'
import dotenv from 'dotenv'
dotenv.config()
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from './emailTemplate.js'

const client = new MailtrapClient({
  token: process.env.MAILTRAP_API_TOKEN,
})

const sender = {
  email: 'mailtrap@demomailtrap.com',
  name: 'Auth App',
}

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    await client.send({
      from: sender,
      to: email,
      subject: 'Auth App - Verify Your Email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationCode}',
        verificationToken
      ),
      category: 'Email Verification',
    })

    console.log('Verification Email Sent')
  } catch (error) {
    console.log(error)
    throw new Error('Error sending verification email')
  }
}

export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      template_uuid: 'bbf90413-26af-46b1-81fc-13e319fe9600', // from mailtrap template
      template_variables: {
        company_info_name: 'Auth App Company',
        name: 'Auth App',
        company_info_address: '123 Test St',
        company_info_city: 'New York',
        company_info_zip_code: '80021',
        company_info_country: 'USA',
      },
    })

    console.log('Welcome email sent successfully', response)
  } catch (error) {
    throw new Error(`Error sending welcome email: ${error}`)
  }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: 'Reset your password',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
      category: 'Password Reset',
    })
  } catch (error) {
    console.error(`Error sending password reset email`, error)

    throw new Error(`Error sending password reset email: ${error}`)
  }
}

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: 'Password Reset Successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: 'Password Reset',
    })

    console.log('Password reset email sent successfully', response)
  } catch (error) {
    throw new Error(`Error sending password reset success email: ${error}`)
  }
}
