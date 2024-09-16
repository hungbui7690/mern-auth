import { Outlet } from 'react-router-dom'
import { FloatingShape } from '../components'

const SharedLayout = () => {
  return (
    <div className='relative flex justify-center items-center min-h-screen overflow-hidden'>
      <FloatingShape
        color='bg-pink-500'
        size='w-64 h-64'
        top='-5%'
        left='10%'
        delay={0}
      />
      <FloatingShape
        color='bg-yellow-500'
        size='w-48 h-48'
        top='70%'
        left='80%'
        delay={5}
      />
      <FloatingShape
        color='bg-rose-500'
        size='w-32 h-32'
        top='40%'
        left='-10%'
        delay={2}
      />
      <Outlet />
    </div>
  )
}
export default SharedLayout
