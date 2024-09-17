import { motion } from 'framer-motion'
import { Input } from '../components'
import { Lock, Mail, Loader } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../zustand/useAuthStore'

const LoginPage = () => {
  const { login, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    await login(data)
    navigate('/')
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
          />

          <motion.button
            className='border-slate-500 shadow-lg mt-5 px-4 py-3 border rounded-lg w-full font-bold text-gray-400 transition duration-200'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
          >
            {isLoading ? (
              <Loader className='mx-auto w-6 h-6 animate-spin' />
            ) : (
              'Login'
            )}
          </motion.button>
        </form>
        <div className='flex flex-col justify-center bg-gray-900 bg-opacity-50 mt-5 px-8 py-4'>
          <p className='text-gray-400 text-sm'>
            {"Don't"} have an account?{' '}
            <Link to={'/signup'} className='text-emerald-500 hover:underline'>
              Sign Up
            </Link>
          </p>
          <p className='text-gray-400 text-sm'>
            Forgot Password?
            <Link
              to={'/forgot-password'}
              className='text-emerald-500 hover:underline'
            >
              {' '}
              Click here
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginPage
