'use client'

import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTheme } from '@/store/uiSlice'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useEffect } from 'react'

const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.ui.theme)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [theme])

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }

  return (
    <button
      onClick={toggleTheme}
      className="border border-zinc-400 dark:border-white text-zinc-700 dark:text-white bg-transparent px-4 py-1 rounded flex items-center justify-center cursor-pointer transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
      aria-label={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
    >
      {theme === 'light' ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  )
}

export default ThemeToggle
