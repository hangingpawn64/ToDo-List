import React, { useState, useEffect } from 'react'
import './Header.css'

const Header = () => {
  const [theme, setTheme] = useState('gradient')

  useEffect(() => {
    // Apply the theme when component mounts or theme changes
    applyTheme(theme)
  }, [theme])

  const applyTheme = (selectedTheme) => {
    const body = document.body
    
    // Remove existing theme classes
    body.classList.remove('theme-light', 'theme-dark', 'theme-gradient')
    
    // Apply the selected theme
    if (selectedTheme === 'light') {
      // Use the gradient background for light theme instead of solid white
      body.style.background = 'linear-gradient(to right, #fff3cc, white)'
      body.classList.add('theme-light')
    } else if (selectedTheme === 'dark') {
      body.style.background = '#0a1014' // Darker background
      body.classList.add('theme-dark')
    } else {
      // Gradient theme (default)
      body.style.background = 'linear-gradient(to right, #3A6073, #16222A)'
      body.classList.add('theme-gradient')
    }
  }

  return (
    <nav className='Header flex flex-row justify-between items-center text-white py-2 sm:py-3 md:py-4 pt-3 sm:pt-5 md:pt-7 w-full px-2 sm:px-4 md:px-6 lg:px-8'>
      <div className="logo">
        <span className="name font-bold text-sm sm:text-lg md:text-xl lg:text-2xl mx-0 sm:mx-4 md:mx-6 lg:mx-9">Get It Together</span>
      </div>
      <ul className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 mx-0 sm:mx-4 md:mx-6 lg:mx-9">
        <li 
          className={`circle light w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 cursor-pointer border ${theme === 'light' ? 'border-blue-500 shadow-[0_0_10px_theme(colors.blue.500)]' : 'border-black'} transition-shadow duration-300 sm:hover:shadow-[0_0_10px_theme(colors.blue.500)]`}
          onClick={() => setTheme('light')}
        ></li>
        <li 
          className={`circle gradient w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 cursor-pointer border ${theme === 'gradient' ? 'border-blue-500 shadow-[0_0_10px_theme(colors.blue.500)]' : 'border-white'} transition-shadow duration-300 sm:hover:shadow-[0_0_10px_theme(colors.blue.500)]`}
          onClick={() => setTheme('gradient')}
        ></li>
        <li 
          className={`circle dark w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 cursor-pointer border ${theme === 'dark' ? 'border-blue-500 shadow-[0_0_10px_theme(colors.blue.500)]' : 'border-white'} transition-shadow duration-300 sm:hover:shadow-[0_0_10px_theme(colors.blue.500)]`}
          onClick={() => setTheme('dark')}
        ></li>
      </ul>
    </nav>
  )
}

export default Header
