"use client"
import styles from "./taskCard.module.css"
import { formatDistanceToNow } from "../../utils/dateUtils"

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    return status === "completed" ? "completed" : "pending"
  }

  // const formatDate = (dateString) => {
  //   try {
  //     return `Created: ${new Date(dateString).toLocaleDateString("en-US", {
  //       month: "short",
  //       day: "numeric",
  //       year: "numeric",
  //     })}`
  //   } catch (error) {
  //     return "Created: Unknown"
  //   }
  // }

  const formatRelativeDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (error) {
      return "Created: Unknown"
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={`${styles.status} ${styles[getStatusColor(task.status)]}`}>
          {task.status === "completed" ? "Completed" : "Pending"}
        </span>
        <div className={styles.actions}>
          <button className={styles.actionButton} onClick={() => onEdit(task)} aria-label="Edit task">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className={`${styles.actionButton} ${styles.deleteButton}`}
            onClick={() => onDelete(task._id)}
            aria-label="Delete task"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="3,6 5,6 21,6" />
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{task.title}</h3>
        <p className={styles.description}>{task.description}</p>

        {task.image && (
          <div className={styles.imageContainer}>
            <img src={`http://localhost:5000${task.image}` || "/placeholder.svg"} alt="Task attachment" className={styles.image} />
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <span className={styles.date}>{formatRelativeDate(task.createdAt)}</span>
      </div>
    </div>
  )
}

export default TaskCard
