'use client'

import { useState} from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router'
// import Link from 'next/link'
// import CountryPicker from '../../../components/auth/CountryPicker'
// import RightAuthContent from '../../../components/auth/RightAuthContent'
// import images from '../../../images'
// import BottomSheet from '../../../components/auth/BottomSheet'
// import { useRouter } from 'next/navigation'
// import { useMutation } from '@apollo/client'
// import { REGISTER_USER } from '../../graphql/mutations/auth'
// import { client } from '../../lib/apollo-client'

// const content = {
//   logo: {
//     src: '',
//     alt: 'Cryptop',
//   },
//   paragraphs: [
//     "At Cryptop, we believe that everyone should have easy, secure access to their digital assets, no matter where they are or what they're doing.",
//     'We are committed to providing a seamless way for people to convert their crypto into spendable currency, bridging the gap between traditional and digital currencies through our digital and physical cards.',
//     "Our mission is to bridge the gap between cryptocurrency and daily life, enabling our users to spend their crypto wherever they shop, whether it's at your local supermarket, gas station, or online stores.",
//     "With our platform, your crypto is not just an investment, it's your currency for everyday use, easily accessible and ready when you are.",
//   ],
  
// }

export default function RegisterPage() {
//   const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
   
  }

 

  return (
    <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="w-full p-4 sm:p-8 md:p-12 lg:p-16 flex flex-col bg-white dark:bg-[#101010] overflow-y-auto scrollbar-hide">
        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Link
              to="/"
              className="text-[#101010] dark:text-white hover:opacity-80"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl lg:text-3xl font-bold ml-4 text-[#101010] dark:text-white">
              CREATE ACCOUNT
            </h1>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Welcome to Cryptop!
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Just a few steps and you going to join your first crypto card!
            </p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-[#101010] dark:text-white bg-white dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-[#0AE08F]"
                required
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
              >
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={e =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-[#101010] dark:text-white bg-white dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-[#0AE08F]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-12 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
              >
                Repeat the password
              </label>
              <input
                // type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={e =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-[#101010] dark:text-white bg-white dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-[#0AE08F]"
                required
              />
              <button
                type="button"
                // onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-12 text-gray-500"
              >
              </button>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-300">
              By creating an account you agree to our{' '}
              <Link to="/terms" className="text-[#0AE08F] hover:underline">
                Terms of Service
              </Link>
            </div>

           
            <button
              type="submit"
              className="w-full bg-[#0AE08F] text-white py-4 rounded-full hover:opacity-90 transition-all duration-200 text-base font-medium disabled:opacity-50"
            >
              {'Sign Up'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/auth/login"
                  className="text-[#0AE08F] hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}
