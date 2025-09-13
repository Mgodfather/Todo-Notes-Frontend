import { useToast as useToastContext } from "../contexts/ToastContext"

// Custom hook for easier toast usage
export const useToast = () => {
  const context = useToastContext()

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  return context
}

// Convenience functions for common toast patterns
export const toast = {
  success: (message) => {
    const { showSuccess } = useToastContext()
    return showSuccess(message)
  },
  error: (message) => {
    const { showError } = useToastContext()
    return showError(message)
  },
  warning: (message) => {
    const { showWarning } = useToastContext()
    return showWarning(message)
  },
  info: (message) => {
    const { showInfo } = useToastContext()
    return showInfo(message)
  },
}
