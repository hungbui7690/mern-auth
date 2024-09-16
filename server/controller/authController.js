import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from '../utils/generateToken.js'
import { User } from '../model/User.js'
import BadRequestError from '../errors/bad-request.js'
import { StatusCodes } from 'http-status-codes'
import { sendVerificationEmail } from '../mailtrap/sendMail.js'

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
