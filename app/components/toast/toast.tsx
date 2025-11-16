'use client'

import { useEffect, useState } from 'react'

export interface ToastProps {
  id: string
  message: string
  type: 'error' | 'success' | 'info' | 'warning'
  duration?: number
  onClose: (id: string) => void
}

export function Toast({ id, message, type, duration = 5000, onClose }: ToastProps) {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true)
      setTimeout(() => onClose(id), 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  const bgColor = {
    error: 'bg-red-500',
    success: 'bg-green-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  }[type]

  const icon = {
    error: 'icon-[mdi--alert-circle]',
    success: 'icon-[mdi--check-circle]',
    info: 'icon-[mdi--information]',
    warning: 'icon-[mdi--alert]'
  }[type]

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg ${bgColor} text-white shadow-lg transition-all duration-300 ${
        isClosing ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
      }`}
    >
      <span className={`${icon} w-5 h-5 flex-shrink-0`} />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={() => {
          setIsClosing(true)
          setTimeout(() => onClose(id), 300)
        }}
        className="flex-shrink-0 hover:opacity-80 transition-opacity"
      >
        <span className="icon-[mdi--close] w-4 h-4" />
      </button>
    </div>
  )
}
