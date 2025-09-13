"use client"

import { formatDistanceToNow } from "../../utils/dateUtils"
import styles from "./noteCard.module.css"

const NoteCard = ({ note, onDelete }) => {
  const formatTimeAgo = (dateString) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (error) {
      return "Unknown time"
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.timeAgo}>{formatTimeAgo(note.createdAt)}</span>
        <button className={styles.deleteButton} onClick={() => onDelete(note._id)} aria-label="Delete note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="3,6 5,6 21,6" />
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>

      <div className={styles.content}>
        <p className={styles.text}>{note.content}</p>
      </div>
    </div>
  )
}

export default NoteCard
