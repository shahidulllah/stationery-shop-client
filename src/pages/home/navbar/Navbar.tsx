'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Link } from 'react-router'




const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState(false)

  // Theme
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true)
      const handleScroll = () => {
        setScrolled(window.scrollY > 0)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const toggleTheme = () => {
    setTheme(true)
  }

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Why Us', href: '/why-us' },
    { label: 'The Project', href: '/project' },
    { label: 'FAQ', href: '/faq' },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Navbar */}
      <nav
        className={`fixed w-full top-0 z-50 transition-colors duration-300 bg-blue-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className=" flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
              {/* This is logo */}
               <img src="" alt="" />
                <h1 className={`font-bold text-3xl  dark:text-white`}>
                STN shop
                </h1>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map(item => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-[#101010] text-lg dark:text-white hover:text-primary transition-colors `}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {mounted && theme === true ? (
                  <Sun className={`h-5 w-5 hover:text-black ${scrolled ? 'text-[#101010] dark:text-white': 'text-white'}`} />
                ) : (
                  <Moon className={`h-5 w-5 hover:text-black `} />
                )}
              </button>
              <Link
                to="/auth"
                className="bg-[#0AE08F] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Sign Up Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {mounted && theme === true ? (
                  <Sun className={`h-5 w-5 hover:text-black ${scrolled ? 'text-[#101010] dark:text-white': 'text-white'}`} />
                ) : (
                  <Moon className={`h-5 w-5 hover:text-black ${scrolled ? 'text-[#101010]': 'text-white'}`} />
                )}
              </button>
              <button
                onClick={toggleMenu}
                className={`${scrolled ? 'text-[#101010]': 'text-white'} dark:text-white hover:text-primary`}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
            {/* <img src="/src/assets/logo.svg" alt="" /> */}
                <h1 className={`font-bold text-3xl  dark:text-white`}>
                STN shop
                </h1>
              <button
                onClick={closeMenu}
                className="text-[#101010] dark:text-white hover:text-primary"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-6">
              {menuItems.map(item => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-[#101010] dark:text-white hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/signup"
                className="bg-[#0AE08F] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity text-center"
                onClick={closeMenu}
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar