import { motion } from 'framer-motion'
import { Input } from '../components'
import { Lock, Mail, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import { useState } from 'react'

const LoginPage = () => {
  const [password, setPassword] = useState('')

  const handleSignUp = async (e) => {
    e.preventDefault()
  }

  return (
    <>
      <div className='p-8'>
        <h2 className='mb-6 font-bold text-3xl text-center'>Login</h2>

        <form onSubmit={handleSignUp}>
          <Input
            icon={Mail}
            type='email'
            placeholder='Email Address'
            name='email'
            defaultValue='user@gmail.com'
          />
          <Input
            icon={Lock}
            type='password'
            placeholder='Password'
            name='password'
            defaultValue='121212'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            className='border-slate-500 shadow-lg mt-5 px-4 py-3 border rounded-lg w-full font-bold text-gray-400 transition duration-200'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
          >
            Login
          </motion.button>
        </form>
        <div className='flex justify-center bg-gray-900 bg-opacity-50 mt-5 px-8 py-4'>
          <p className='text-gray-400 text-sm'>
            {"Don't"} have an account?{' '}
            <Link to={'/signup'} className='text-emerald-500 hover:underline'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginPage
