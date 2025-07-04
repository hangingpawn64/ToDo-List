import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <nav className='Header flex flex-col sm:flex-row justify-between items-center text-white py-4 pt-7 w-full px-2 sm:px-8'>
      <div className="logo mb-2 sm:mb-0">
        <span className="name font-bold text-lg sm:text-xl md:text-2xl mx-0 sm:mx-9"> Get It Together</span>
      </div>
      <ul className="flex gap-4 sm:gap-8 mx-0 sm:mx-9">
        <li className='circle light w-8 h-8 sm:w-12 sm:h-12 cursor-pointer border border-black transition-shadow duration-300 sm:hover:shadow-[0_0_10px_theme(colors.blue.500)]'></li>
        <li className='circle gradient w-8 h-8 sm:w-12 sm:h-12 cursor-pointer border border-white transition-shadow duration-300 sm:hover:shadow-[0_0_10px_theme(colors.blue.500)]'></li>
        <li className='circle dark w-8 h-8 sm:w-12 sm:h-12 cursor-pointer border border-white transition-shadow duration-300 sm:hover:shadow-[0_0_10px_theme(colors.blue.500)]'></li>
      </ul>
    </nav>
  )
}

export default Header
