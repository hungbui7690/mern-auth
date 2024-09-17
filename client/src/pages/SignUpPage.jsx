import { motion } from 'framer-motion'
import { Input } from '../components'
import { Lock, Mail, User, Loader } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import { useState } from 'react'
import { useAuthStore } from '../zustand/useAuthStore'

const SignUpPage = () => {
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    await signup(data)
    navigate('/verify-email')
  }

  return (
    <>
      <div className='p-8'>
        <h2 className='mb-6 font-bold text-3xl text-center'>Create Account</h2>
        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type='text'
            placeholder='Full Name'
            name='name'
            defaultValue='user'
          />
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordStrengthMeter password={password} />

          <motion.button
            className='border-slate-500 shadow-lg mt-5 px-4 py-3 border rounded-lg w-full font-bold text-gray-400 transition duration-200'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
          >
            Sign Up
          </motion.button>

          {error && (
            <p className='my-5 mt-2 font-semibold text-red-500'>{error}</p>
          )}
        </form>
        <div className='flex justify-center bg-gray-900 bg-opacity-50 mt-5 px-8 py-4'>
          <p className='text-gray-400 text-sm'>
            Already have an account?{' '}
            <Link to={'/login'} className='text-emerald-500 hover:underline'>
              {isLoading ? (
                <Loader className='mx-auto animate-spin' size={24} />
              ) : (
                'Sign Up'
              )}
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
