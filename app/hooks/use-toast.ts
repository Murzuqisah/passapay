'use client'

import { useToastContext } from '@/app/context/toast-context'

export function useToast() {
  const context = useToastContext()

  const showError = (message: string, duration?: number) => {
    context.addToast(message, 'error', duration)
  }

  const showSuccess = (message: string, duration?: number) => {
    context.addToast(message, 'success', duration)
  }

  const showInfo = (message: string, duration?: number) => {
    context.addToast(message, 'info', duration)
  }

  const showWarning = (message: string, duration?: number) => {
    context.addToast(message, 'warning', duration)
  }

  return {
    toasts: context.toasts,
    removeToast: context.removeToast,
    showError,
    showSuccess,
    showInfo,
    showWarning
  }
}
