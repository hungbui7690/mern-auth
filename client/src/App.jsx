import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SharedLayout from './pages/SharedLayout'
import { HomePage, LoginPage, SignUpPage, VerifyEmailPage } from './pages'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path='signup' element={<SignUpPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='verify-email' element={<VerifyEmailPage />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
