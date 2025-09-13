"use client"

import { useState, useEffect } from "react"
import ImageUpload from "../ImageUpload/ImageUpload"
import styles from "./taskModal.module.css"

const TaskModal = ({ task, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    image: null,
  })

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "pending",
        image: task.image || null,
      })
    }
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    onSave(formData)
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageChange = (imageData) => {
    setFormData((prev) => ({
      ...prev,
      image: imageData,
    }))
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{task ? "Edit Task" : "Add New Task"}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>
              Title <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter task title..."
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter task description..."
              className={styles.textarea}
              rows={4}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className={styles.select}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Image (Optional)</label>
            <ImageUpload currentImage={formData.image} onImageChange={handleImageChange} />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.saveButton} disabled={!formData.title.trim()}>
              {task ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal
