import React from 'react'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="py-6 bg-white dark:bg-neutral-800   border border-gray-200 dark:border-gray-800  shadow-md ">
      <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between ">
        
        {/* Logo */}
        <div className="mb-4 md:mb-0">
          <Logo width="100px" />
        </div>

        {/* Copyright */}
        <p className="text-sm text-black dark:text-gray-100">
          &copy; {new Date().getFullYear()} Vidit. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer