import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from '../utils/generateToken.js'
import { User } from '../model/User.js'
import BadRequestError from '../errors/bad-request.js'
import { StatusCodes } from 'http-status-codes'

export const signup = async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name)
    throw new BadRequestError('All fields are required')

  const userAlreadyExists = await User.findOne({ email })
  if (userAlreadyExists) throw new BadRequestError('User already exists')

  const hashedPassword = await bcryptjs.hash(password, 10)
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString()

  const user = new User({
    email,
    password: hashedPassword,
    name,
    verificationToken,
    verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  })

  await user.save()

  generateTokenAndSetCookie(user._id, res)

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'User created successfully',
    user: {
      ...user._doc,
      password: undefined,
    },
  })
}
