import { useState } from "react"
import { AppProvider } from "./contexts/AppContext"
import { ToastProvider } from "./contexts/ToastContext"
import Header from "./components/Header/Header"
import Navigation from "./components/Navigation/Navigation"
import TasksTab from "./components/Tasks/TasksTab"
import NotesTab from "./components/Notes/NotesTab"
import ToastContainer from "./components/Toast/ToastContainer"
import styles from "./app.module.css"

export default function App() {
  const [activeTab, setActiveTab] = useState("tasks")

  return (
    <ToastProvider>
      <AppProvider>
        <div className={styles.app}>
          <Header />
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className={styles.main}>{activeTab === "tasks" ? <TasksTab /> : <NotesTab />}</main>
          <ToastContainer />
        </div>
      </AppProvider>
    </ToastProvider>
  )
}