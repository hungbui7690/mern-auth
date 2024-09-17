import { create } from 'zustand'
import { axiosInstance } from '../utils/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (formData) => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosInstance.post(`/auth/signup`, formData)
      set({ user: res.data.user, isAuthenticated: true, isLoading: false })
      toast.success('Account created successfully. Please verify your email.')
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Error signing up')
      set({
        error: error?.response?.data?.msg || 'Error signing up',
        isLoading: false,
      })
      throw error
    }
  },
  verifyEmail: async (formData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.post(`/auth/verify-email`, formData)
      set({ user: response.data.user, isAuthenticated: true, isLoading: false })
      toast.success('Email verified successfully.')
      return response.data
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Error verifying email')
      set({
        error: error.response.data.msg || 'Error verifying email',
        isLoading: false,
      })

      throw error
    }
  },
  login: async (formData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.post(`auth/login`, formData)
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      })
      toast.success('Logged in successfully.')
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Error logging in')
      set({
        error: error.response?.data?.message || 'Error logging in',
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
      toast.error(error?.response?.data?.msg || 'Error logging out')
      set({ error: 'Error logging out', isLoading: false })
      throw error
    }
  },
}))
