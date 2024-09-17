import { motion } from 'framer-motion'
import { useAuthStore } from '../zustand/useAuthStore'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '../components/Input'
import { Lock } from 'lucide-react'
import toast from 'react-hot-toast'

const ResetPasswordPage = () => {
  const { resetPassword, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const { token } = useParams()
  console.log(token)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    const newPassword = data.newPassword
    const confirmPassword = data.confirmPassword

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    await resetPassword(token, { newPassword })
    navigate('/login')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='bg-gray-800 bg-opacity-50 shadow-xl backdrop-blur-xl backdrop-filter rounded-2xl w-full max-w-md overflow-hidden'
    >
      <div className='p-8'>
        <h2 className='bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-6 font-bold text-3xl text-center text-transparent'>
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type='password'
            placeholder='New Password'
            name='newPassword'
            required
          />
          <Input
            icon={Lock}
            type='password'
            placeholder='Confirm New Password'
            name='confirmPassword'
            required
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='bg-gradient-to-r from-green-500 hover:from-green-600 to-emerald-600 hover:to-emerald-700 shadow-lg px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 w-full font-bold text-white focus:outline-none transition duration-200'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Set New Password'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default ResetPasswordPage
