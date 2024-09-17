import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../zustand/useAuthStore'
import { motion } from 'framer-motion'
import { formatDate } from '../utils/date'

const HomePage = () => {
  const { logout, user } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className='border-gray-800 bg-gray-900 bg-opacity-80 shadow-2xl backdrop-blur-lg backdrop-filter mx-auto mt-10 p-8 border rounded-xl w-full max-w-md'
    >
      <h2 className='mb-6 font-bold text-3xl text-center text-slate-400'>
        Dashboard
      </h2>

      <div className='space-y-6'>
        <motion.div
          className='border-gray-700 bg-gray-800 bg-opacity-50 p-4 border rounded-lg'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className='mb-3 font-semibold text-emerald-500 text-xl'>
            Profile Information
          </h3>
          <p className='text-gray-300'>Name: {user.name}</p>
          <p className='text-gray-300'>Email: {user.email}</p>
        </motion.div>
        <motion.div
          className='border-gray-700 bg-gray-800 bg-opacity-50 p-4 border rounded-lg'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className='mb-3 font-semibold text-emerald-500 text-xl'>
            Account Activity
          </h3>
          <p className='text-gray-300'>
            <span className='font-bold'>Joined: </span>
            {new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className='text-gray-300'>
            <span className='font-bold'>Last Login: </span>

            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className='mt-4'
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className='border-gray-400 shadow-lg px-4 py-3 rounded-lg w-full font-bold text-white focus:outline-none border'
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
export default HomePage
