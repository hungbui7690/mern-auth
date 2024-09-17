import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from '../utils/generateToken.js'
import { User } from '../model/User.js'
import BadRequestError from '../errors/bad-request.js'
import { StatusCodes } from 'http-status-codes'
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from '../mailtrap/sendMail.js'
import crypto from 'crypto'

export const signup = async (req, res) => {
  const { email, password, name } = req.body

  // check if all fields are provided
  if (!email || !password || !name)
    throw new BadRequestError('All fields are required')

  // check if user already exists
  const userAlreadyExists = await User.findOne({ email })
  if (userAlreadyExists) throw new BadRequestError('User already exists')

  // hash password
  const hashedPassword = await bcryptjs.hash(password, 10)
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString()

  // create user
  const user = new User({
    email,
    password: hashedPassword,
    name,
    verificationToken,
    verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  })
  await user.save()

  // generate token and set cookie
  generateTokenAndSetCookie(user._id, res)

  // send verification email
  await sendVerificationEmail(user.email, verificationToken)

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'User created successfully',
    user: {
      ...user._doc,
      password: undefined,
    },
  })
}

export const verifyEmail = async (req, res) => {
  const { code } = req.body
  console.log(code)

  // find user with verification code
  const user = await User.findOne({
    verificationToken: code,
    verificationTokenExpiresAt: { $gt: Date.now() },
  })

  // check if user exists
  if (!user) throw new BadRequestError('Invalid or expired verification code')

  // update user
  user.isVerified = true
  user.verificationToken = undefined
  user.verificationTokenExpiresAt = undefined
  await user.save()

  // send welcome email
  await sendWelcomeEmail(user.email, user.name)

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Email verified successfully',
    user: {
      ...user._doc,
      password: undefined,
    },
  })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  // check if user exists or not
  const user = await User.findOne({ email })
  if (!user) throw new BadRequestError('Invalid credentials')

  // check if password is valid
  const isPasswordValid = await bcryptjs.compare(password, user.password)
  if (!isPasswordValid) throw new BadRequestError('Invalid credentials')

  generateTokenAndSetCookie(user._id, res)

  user.lastLogin = new Date()
  await user.save()

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Logged in successfully',
    user: {
      ...user._doc,
      password: undefined,
    },
  })
}

export const logout = async (req, res) => {
  res.clearCookie('authToken')
  res
    .status(StatusCodes.OK)
    .json({ success: true, message: 'Logged out successfully' })
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body
  console.log(req.body)
  const user = await User.findOne({ email })

  if (!user)
    throw new BadRequestError(
      `User with email ${email} not found in our system`
    )

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex')
  const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000 // 1 hour

  user.resetPasswordToken = resetToken
  user.resetPasswordExpiresAt = resetTokenExpiresAt

  await user.save()

  // user clicks on forgot password button -> server send email with reset link -> user clicks on link -> sends to reset password page -> http:localhost:3000/reset-password/:resetToken -> user enters new password -> submit -> client sends new password to server -> server updates password -> sends success email to user
  await sendPasswordResetEmail(
    user.email,
    `${process.env.CLIENT_URL}/reset-password/${resetToken}`
  )

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Password reset link sent to your email',
  })
}

export const resetPassword = async (req, res) => {
  const { token } = req.params
  const { newPassword } = req.body

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: Date.now() },
  })

  if (!user) throw new BadRequestError('Invalid or expired reset token')

  // update password
  const hashedPassword = await bcryptjs.hash(newPassword, 10)

  user.password = hashedPassword
  user.resetPasswordToken = undefined
  user.resetPasswordExpiresAt = undefined
  await user.save()

  await sendResetSuccessEmail(user.email)

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: 'Password reset successful' })
}

export const checkAuth = async (req, res) => {
  const user = await User.findById(req.userId).select('-password')
  if (!user) throw new BadRequestError('User not found')

  res.status(StatusCodes.OK).json({ success: true, user })
}
