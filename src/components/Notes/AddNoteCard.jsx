"use client"

import { useState } from "react"
import styles from "./addNoteCard.module.css"

const AddNoteCard = ({ onAddNote }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) return

    onAddNote(content.trim())
    setContent("")
    setIsEditing(false)
  }

  const handleCancel = () => {
    setContent("")
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCancel()
    }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e)
    }
  }

  if (isEditing) {
    return (
      <div className={styles.editingCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            className={styles.textarea}
            autoFocus
            onKeyDown={handleKeyDown}
            rows={4}
          />
          <div className={styles.actions}>
            <button type="button" onClick={handleCancel} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.saveButton} disabled={!content.trim()}>
              Save Note
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <button className={styles.addCard} onClick={() => setIsEditing(true)}>
      <svg className={styles.addIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      <span>Click to add a new note...</span>
    </button>
  )
}

export default AddNoteCard
