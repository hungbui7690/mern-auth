import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SharedLayout from './pages/SharedLayout'
import {
  ErrorPage,
  HomePage,
  LoginPage,
  SignUpPage,
  VerifyEmailPage,
} from './pages'
import { useAuthStore } from './zustand/useAuthStore'

function App() {
  const { user } = useAuthStore()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route
              index
              element={user ? <HomePage /> : <Navigate to='/login' replace />}
            />
            <Route
              path='signup'
              element={!user ? <SignUpPage /> : <Navigate to='/' replace />}
            />
            <Route
              path='login'
              element={!user ? <LoginPage /> : <Navigate to='/' replace />}
            />
            <Route
              path='verify-email'
              element={
                !user?.isVerified ? (
                  <VerifyEmailPage />
                ) : (
                  <Navigate to='/' replace />
                )
              }
            />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
