import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../zustand/useAuthStore'

const EmailVerificationPage = () => {
  const inputRef = useRef([])
  const navigate = useNavigate()
  const { verifyEmail } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const code = formData.get('code')
    if (!code) {
      toast.error('Please enter the 6-digits code to verify your account.')
      return
    }

    await verifyEmail({ code })
    navigate('/')
  }

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  return (
    <div className='bg-opacity-20 shadow-xl backdrop-blur-xl backdrop-filter rounded-2xl w-full max-w-md overflow-hidden'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-gray-800 bg-opacity-50 shadow-2xl backdrop-blur-xl backdrop-filter p-8 rounded-2xl w-full max-w-md'
      >
        <h2 className='mb-6 font-bold text-3xl text-center text-gray-300'>
          Verify Your Email
        </h2>
        <p className='mb-6 text-center text-gray-300'>
          Enter the 6-digits code that was sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex justify-between'>
            <input
              type='text'
              maxLength='6'
              className='border-2 border-gray-600 bg-transparent rounded-lg w-full font-bold text-2xl text-center text-white focus:outline-none'
              ref={inputRef}
              name='code'
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='submit'
            className='border-slate-500 bg-pink-600 shadow-lg px-4 py-3 border rounded-lg w-full font-bold text-white focus:outline-none'
          >
            Verify Email
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default EmailVerificationPage
