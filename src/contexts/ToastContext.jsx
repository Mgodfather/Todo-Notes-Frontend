"use client"

import { createContext, useContext, useState } from "react"

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = "info") => {
    const id = Date.now().toString()
    const toast = { id, message, type }

    setToasts((prev) => [...prev, toast])

    // Auto remove after 4 seconds
    setTimeout(() => {
      removeToast(id)
    }, 4000)

    return id
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const showSuccess = (message) => addToast(message, "success")
  const showError = (message) => addToast(message, "error")
  const showWarning = (message) => addToast(message, "warning")
  const showInfo = (message) => addToast(message, "info")

  const value = {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
