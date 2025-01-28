
import {
 Facebook,
  Instagram,
  TextIcon as Telegram,
  TwitterIcon,
} from 'lucide-react'
import { Link } from 'react-router'


const navigationLinks = [
  [
    { label: 'Home', href: '/' },
    { label: 'The Project', href: '/project' },
    { label: 'Why Us', href: '/why-us' },
    { label: 'FAQ', href: '/faq' },
  ],
  [
    { label: 'Website Policy', href: '/website-policy' },
    { label: 'Accessibility Policy', href: '/accessibility' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms and Conditions', href: '/terms' },
  ],
]

export default function Footer() {
  return (
    <footer className="bg-[linear-gradient(65.92deg,_black_40.27%,_white_180.8%)] h-full w-full dark:bg-gradient-to-r dark:from-[#121316] dark:to-[#3a3a3a] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-3">
                {/* <img src="/src/assets/logo.svg" alt="" /> */}
                <h1 className="font-bold text-3xl text-white dark:text-white">
                STN shop
                </h1>
              </Link>
          </div>

          {/* Tagline */}
          <div className="max-w-md space-y-2">
            <p className="text-[#ffffff] dark:text-gray-300">
              We believe in simplicity, speed, and security.
            </p>
            <p className="text-[#ffffff] dark:text-gray-300">
              Start with STN shop Today and convert your crypt into a card you
              can use anywhere – and fast.
            </p>
          </div>

          {/* Sign Up Button */}
          <Link
            to="/signup"
            className="inline-flex items-center bg-[#0AE08F] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Sign Up Now →
          </Link>

          {/* Navigation Links */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mt-12">
            {navigationLinks.map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-4 grid grid-cols-1 text-start md:grid-cols-2 items-center">
                {column.map(link => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block text-[#ffffff] dark:text-gray-300 hover:text-[#0AE08F] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full border-t border-gray-200 dark:border-gray-700 my-8" />

          {/* Copyright and Social Links */}
          <div className="w-full flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 text-start">
         <div>
          <p className="text-xl text-[#ffffff] dark:text-gray-400 font-bold font-oswald"> STN shop</p>
            <p className="text-sm text-[#ffffff] dark:text-gray-400">
              Copyright © 2024  STN shop All Rights Reserved
            </p>
         </div>
            <div className="flex justify-end space-x-4 text-[#ffffff]">
              <Link
                to="#"
                className=" dark:text-gray-400 hover:text-[#0AE08F]"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                to="#"
                className=" dark:text-gray-400 hover:text-[#0AE08F]"
              >
                <Telegram className="w-5 h-5" />
              </Link>
              <Link
                to="#"
                className=" dark:text-gray-400 hover:text-[#0AE08F]"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                to="#"
                className=" dark:text-gray-400 hover:text-[#0AE08F]"
              >
                <TwitterIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
