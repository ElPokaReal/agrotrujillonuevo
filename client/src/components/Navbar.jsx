import React from 'react'
import Toggle from './ThemeToggle'

function Navbar() {
  return (
    <nav className='bg-white border-gray-200 px-2 py-2 dark:bg-[#1d1d1d] transition-all duration-200'>
      <div className='container flex justify-between items-center mx-auto'>
        <div className='flex items-center mx-auto'>
          <span className='text-xl font-medium whitespace-nowrap dark:text-white'>
          </span>
        </div>
        <div className='flex justify-end pr-4'>
        <Toggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar;