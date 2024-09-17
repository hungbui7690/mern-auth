import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAuthStore } from '../zustand/useAuthStore'
import Input from '../components/Input'
import { ArrowLeft, Loader, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { isLoading, forgotPassword } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    await forgotPassword(data)
    setIsSubmitted(true)
    setEmail('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='bg-gray-800 bg-opacity-50 shadow-xl backdrop-blur-xl backdrop-filter rounded-2xl w-full max-w-md overflow-hidden'
    >
      <div className='p-8'>
        <h2 className='mb-6 font-bold text-3xl text-center text-slate-400'>
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className='mb-6 text-center text-gray-300'>
              Enter your email address and {"we'll"} send you a link to reset
              your password.
            </p>
            <Input
              icon={Mail}
              type='email'
              placeholder='Email Address'
              name='email'
              required
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='border-slate-400 shadow-lg px-4 py-3 border rounded-lg w-full font-bold text-slate-400 focus:outline-none transition duration-200'
              type='submit'
            >
              {isLoading ? (
                <Loader className='mx-auto animate-spin size-6' />
              ) : (
                'Send Reset Link'
              )}
            </motion.button>
          </form>
        ) : (
          <div className='text-center'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className='flex justify-center items-center bg-green-500 mx-auto mb-4 rounded-full w-16 h-16'
            >
              <Mail className='w-8 h-8 text-white' />
            </motion.div>
            <p className='mb-6 text-gray-300'>
              If an account exists on this {email}, you will receive a password
              reset link shortly.
            </p>
          </div>
        )}
      </div>

      <div className='flex justify-center bg-gray-900 bg-opacity-50 px-8 py-4'>
        <Link
          to={'/login'}
          className='flex items-center text-emerald-500 text-sm hover:underline'
        >
          <ArrowLeft className='mr-2 w-4 h-4' /> Back to Login
        </Link>
      </div>
    </motion.div>
  )
}

export default ForgotPasswordPage
