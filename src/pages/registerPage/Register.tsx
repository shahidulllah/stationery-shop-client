'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
// import Link from 'next/link'
// import CountryPicker from '../../../components/auth/CountryPicker'
// import RightAuthContent from '../../../components/auth/RightAuthContent'
// import images from '../../../images'
// import BottomSheet from '../../../components/auth/BottomSheet'
// import { useRouter } from 'next/navigation'
// import { useMutation } from '@apollo/client'
// import { REGISTER_USER } from '../../graphql/mutations/auth'
// import { client } from '../../lib/apollo-client'

const content = {
  logo: {
    src: '',
    alt: 'Cryptop',
  },
  paragraphs: [
    "At Cryptop, we believe that everyone should have easy, secure access to their digital assets, no matter where they are or what they're doing.",
    'We are committed to providing a seamless way for people to convert their crypto into spendable currency, bridging the gap between traditional and digital currencies through our digital and physical cards.',
    "Our mission is to bridge the gap between cryptocurrency and daily life, enabling our users to spend their crypto wherever they shop, whether it's at your local supermarket, gas station, or online stores.",
    "With our platform, your crypto is not just an investment, it's your currency for everyday use, easily accessible and ready when you are.",
  ],
  
}

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'BD',
    name: 'Bangladesh',
    flag: images.bdFlag,
    dialCode: '+880',
    format: '### ### ####',
  })
  const [phoneError, setPhoneError] = useState('')
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    client,
    onCompleted: data => {
      console.log('Registration successful:', data)
      localStorage.setItem('accessToken', data.registerUser.accessToken)
      window.location.href = `/auth/verify?email=${encodeURIComponent(
        formData.email
      )}`
    },
    onError: error => {
      console.error('Registration error:', error)
    },
  })

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

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await registerUser({
        variables: {
          input: {
            email: formData.email,
            password: formData.password,
            phone: '01920204818',
          },
        },
      })
    } catch (err) {
      console.error('Form submission error:', err)
    }
  }

  const validatePhoneNumber = () => {
    const phoneRegex = {
      BD: /^\d{3} \d{3} \d{4}$/,
      US: /^$$\d{3}$$ \d{3}-\d{4}$/,
      CA: /^$$\d{3}$$ \d{3}-\d{4}$/,
    }

    if (!phoneRegex[selectedCountry.code].test(formData.phone)) {
      setPhoneError(`Please enter a valid ${selectedCountry.name} phone number`)
      return false
    }
    setPhoneError('')
    return true
  }

  const formatPhoneNumber = value => {
    const digits = value.replace(/\D/g, '')
    const format = selectedCountry.format
    let result = ''
    let digitIndex = 0

    for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
      if (format[i] === '#') {
        result += digits[digitIndex]
        digitIndex++
      } else {
        result += format[i]
      }
    }

    return result
  }

  const handlePhoneChange = e => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    setFormData({ ...formData, phone: formattedPhone })
  }

  return (
    <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 p-4 sm:p-8 md:p-12 lg:p-16 flex flex-col bg-white dark:bg-[#101010] overflow-y-auto scrollbar-hide">
        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Link
              href="/auth"
              className="text-[#101010] dark:text-white hover:opacity-80"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl lg:text-5xl font-bold ml-4 text-[#101010] dark:text-white">
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

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
              >
                Phone number
              </label>
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
                  <CountryPicker
                    selectedCountry={selectedCountry}
                    onSelect={country => {
                      setSelectedCountry(country)
                      setFormData({ ...formData, phone: '' })
                      setPhoneError('')
                    }}
                  />
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full sm:w-2/3 px-4 py-3 border border-gray-300 rounded-full sm:rounded-l-none text-[#101010] dark:text-white bg-white dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-[#0AE08F]"
                  placeholder={selectedCountry.format.replace(/#/g, '0')}
                  required
                />
              </div>
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">{phoneError}</p>
              )}
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
                type={showConfirmPassword ? 'text' : 'password'}
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-12 text-gray-500"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-300">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="text-[#0AE08F] hover:underline">
                Terms of Service
              </Link>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error.message}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0AE08F] text-white py-4 rounded-full hover:opacity-90 transition-all duration-200 text-base font-medium disabled:opacity-50"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="text-[#0AE08F] hover:underline"
                >
                  Sign in
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
            className="fixed bottom-4 right-4 bg-[#0AE08F] text-white p-3 rounded-full shadow-lg"
          >
            More Info
          </button>
          <BottomSheet
            isOpen={isBottomSheetOpen}
            setIsOpen={setIsBottomSheetOpen}
          >
            <RightAuthContent content={content} />
          </BottomSheet>
        </>
      ) : (
        <div className="w-full lg:w-1/2 lg:h-screen overflow-y-auto scrollbar-hide">
          <RightAuthContent content={content} />
        </div>
      )}
    </div>
  )
}
