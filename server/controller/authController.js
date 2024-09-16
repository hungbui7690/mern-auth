import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from '../utils/generateToken.js'
import { User } from '../model/User.js'
import BadRequestError from '../errors/bad-request.js'
import { StatusCodes } from 'http-status-codes'
import {
  sendVerificationEmail,
  sendWelcomeEmail,
} from '../mailtrap/sendMail.js'

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
