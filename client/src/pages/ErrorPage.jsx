import { Link } from 'react-router-dom'
import AccessDeniedImg from '/access-denied.svg'

const ErrorPage = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-12 p-10'>
      <img src={AccessDeniedImg} alt='404' className='w-64' />
      <main className='flex flex-col justify-center items-center gap-12'>
        <h1 className='font-semibold text-3xl'>Lost your way?</h1>
        <p className=''>
          {"You're"} not allowed to access this page. Please go back to the home
          page.
        </p>
        <Link
          to={'/'}
          className='bg-[#B91C1C] mx-auto px-4 py-2 rounded font-bold text-white'
        >
          Back to Home
        </Link>
      </main>
    </div>
  )
}

export default ErrorPage
