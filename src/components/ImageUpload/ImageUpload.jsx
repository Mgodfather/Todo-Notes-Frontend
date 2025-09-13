"use client"

import { useState, useRef } from "react"
import styles from "./imageUpload.module.css"

const ImageUpload = ({ currentImage, onImageChange }) => {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState(currentImage)
  const fileInputRef = useRef(null)

  const handleFiles = (files) => {
    const file = files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB")
      return
    }

    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target.result
      setPreview(imageUrl)
      onImageChange(imageUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    setPreview(null)
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={styles.container}>
      {preview ? (
        <div className={styles.previewContainer}>
          <img src={preview || "/placeholder.svg"} alt="Preview" className={styles.previewImage} />
          <div className={styles.previewOverlay}>
            <button type="button" onClick={handleClick} className={styles.changeButton}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Change
            </button>
            <button type="button" onClick={handleRemove} className={styles.removeButton}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="3,6 5,6 21,6" />
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21,15 16,10 5,21" />
          </svg>
          <div className={styles.uploadText}>
            <span className={styles.clickText}>Click to upload</span>
            <span className={styles.dragText}> or drag and drop</span>
          </div>
          {/* <span className={styles.fileTypes}>PNG, JPG, GIF up to 10MB</span> */}
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleChange} className={styles.hiddenInput} />
    </div>
  )
}

export default ImageUpload
