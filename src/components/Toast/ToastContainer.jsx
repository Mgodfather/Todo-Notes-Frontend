"use client"

import { useToast } from "../../contexts/ToastContext"
import Toast from "./Toast"
import styles from "./toastContainer.module.css"

const ToastContainer = () => {
  const { toasts } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

export default ToastContainer
