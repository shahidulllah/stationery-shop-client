'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
// import Link from 'next/link'
// import BottomSheet from '../../../components/auth/BottomSheet'
// import RightAuthContent from '../../../components/auth/RightAuthContent'
// import { useMutation } from '@apollo/client'
// import { LOGIN_USER } from '../../graphql/mutations/auth'
// import { client } from '../../lib/apollo-client'
// import { setAuthToken } from '../../lib/cookies'
// import images from '../../../images'

const content = {
  logo: {
    src: '',
    alt: 'Cryptop',
  },
  paragraphs: [
    "At Cryptop, we believe that everyone should have easy, secure access to their digital assets, no matter where they are or what they're doing.",
    'We are committed to providing a seamless way for people to convert their crypto holdings into everyday spending power through our innovative digital and physical cards.',
    "Our mission is to bridge the gap between cryptocurrency and daily life, enabling our users to spend their crypto wherever they shop - whether it's at your local supermarket, gas station, or online stores.",
    "With our platform, your crypto is not just an investment, it's your currency for everyday use, easily accessible and ready when you are.",
  ],
 
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 1024)
      }
      checkIsMobile()
      window.addEventListener('resize', checkIsMobile)
      return () => window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    client,
    onCompleted: data => {
      console.log('Login successful:', data)
      setAuthToken(data.loginUser.accessToken)
      window.location.href = '/dashboard'
    },
    onError: error => {
      console.error('Login error:', error)
    },
  })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await loginUser({
        variables: {
          input: {
            email: formData.email,
            password: formData.password,
          },
        },
      })
    } catch (err) {
      console.error('Form submission error:', err)
    }
  }

  return (
    <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col bg-white dark:bg-[#101010] overflow-y-auto scrollbar-hide transition-colors duration-300">
        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="flex items-center mb-8 md:mb-10">
            <Link
              href="/auth"
              className="text-[#101010] dark:text-white hover:opacity-80 transition-opacity p-2 -ml-2"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold ml-2 text-[#101010] dark:text-white transition-colors">
              LOG-IN
            </h1>
          </div>

          {/* Welcome Text */}
          <div className="mb-8 md:mb-10">
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base transition-colors">
              Welcome Back!
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base transition-colors">
              Log in to access your dashboard.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full text-[#101010] dark:text-white bg-white dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-[#0AE08F] focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full text-[#101010] dark:text-white bg-white dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-[#0AE08F] focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={e =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                  className="w-4 h-4 border-gray-300 rounded text-[#0AE08F] focus:ring-[#0AE08F] transition-colors"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors">
                  Remember Me
                </span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-[#0AE08F] hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0AE08F] text-white py-4 rounded-full hover:opacity-90 transition-all duration-200 text-base font-medium"
            >
              Login
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                Don't have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="text-[#0AE08F] hover:underline transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side / Bottom Sheet */}
      {isMobile ? (
        <>
          <button
            onClick={() => setIsBottomSheetOpen(true)}
            className="fixed bottom-6 right-6 bg-[#0AE08F] text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-all duration-200 z-50"
            aria-label="Show more information"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <BottomSheet
            isOpen={isBottomSheetOpen}
            setIsOpen={setIsBottomSheetOpen}
          >
            <RightAuthContent content={content} />
          </BottomSheet>
        </>
      ) : (
        <div className="w-full lg:w-1/2 lg:h-screen overflow-y-auto scrollbar-hide bg-[#101010] transition-colors duration-300">
          <RightAuthContent content={content} />
        </div>
      )}
    </div>
  )
}
