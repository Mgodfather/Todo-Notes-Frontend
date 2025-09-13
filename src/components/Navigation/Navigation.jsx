import styles from "./navigation.module.css"

const Navigation = ({ activeTab, setActiveTab }) => {
  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "tasks" ? styles.active : ""}`}
            onClick={() => setActiveTab("tasks")}
          >
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            Tasks
          </button>
          <button
            className={`${styles.tab} ${activeTab === "notes" ? styles.active : ""}`}
            onClick={() => setActiveTab("notes")}
          >
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10,9 9,9 8,9" />
            </svg>
            Notes
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
