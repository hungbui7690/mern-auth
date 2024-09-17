import { create } from 'zustand'
import { axiosInstance } from '../utils/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: null,
  isLoading: false,
  message: null,
  signup: async (formData) => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosInstance.post(`/auth/signup`, formData)
      set({ user: res.data.user, isAuthenticated: true, isLoading: false })
      toast.success('Account created successfully. Please verify your email.')
      localStorage.setItem('user', JSON.stringify(res.data.user))
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Error signing up')
      set({
        isLoading: false,
      })
      localStorage.removeItem('user')
      throw error
    }
  },
  verifyEmail: async (formData) => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosInstance.post(`/auth/verify-email`, formData)
      set({ user: res.data.user, isAuthenticated: true, isLoading: false })
      toast.success('Email verified successfully.')
      localStorage.setItem('user', JSON.stringify(res.data.user))
      return res.data
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Error verifying email')
      localStorage.removeItem('user')
      set({
        isLoading: false,
      })

      throw error
    }
  },
  login: async (formData) => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosInstance.post(`auth/login`, formData)
      set({
        isAuthenticated: true,
        user: res.data.user,
        error: null,
        isLoading: false,
      })
      toast.success('Logged in successfully.')
      localStorage.setItem('user', JSON.stringify(res.data.user))
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Error logging in')
      localStorage.removeItem('user')
      set({
        isLoading: false,
      })
      throw error
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null })
    try {
      await axiosInstance.post(`/auth/logout`)
      set({ user: null, isAuthenticated: false, error: null, isLoading: false })
      toast.success('Logged out successfully.')
    } catch (error) {
      console.log(error?.response?.data?.msg || 'Error logging out')
      set({ error: 'Error logging out', isLoading: false })
      throw error
    } finally {
      localStorage.removeItem('user')
    }
  },
  forgotPassword: async (formData) => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosInstance.post(`/auth/forgot-password`, formData)
      toast.success(res.data.message)
      set({ isLoading: false })
    } catch (error) {
      toast.error(
        error.response.data.msg || 'Error sending reset password email'
      )
      set({
        isLoading: false,
      })
      throw error
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        password
      )
      set({ message: response.data.message, isLoading: false })
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Error resetting password')
      set({
        isLoading: false,
      })
      throw error
    }
  },
}))
