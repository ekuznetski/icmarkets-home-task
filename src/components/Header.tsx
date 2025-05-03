import React from 'react'
import ThemeToggle from './ThemeToggle'

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white text-black border-b border-gray-200 dark:bg-zinc-900 dark:text-white dark:border-gray-800 px-6 py-3 flex items-center justify-end">
      <ThemeToggle />
    </header>
  )
}

export default Header
