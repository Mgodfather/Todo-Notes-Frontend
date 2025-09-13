"use client"

import { useState, useEffect } from "react"
import { useApp } from "../../contexts/AppContext"
import { useToast } from "../../contexts/ToastContext"
import TaskCard from "./TaskCard"
import TaskModal from "./TaskModal"
import SearchAndFilters from "./SearchAndFilters"
import styles from "./tasksTab.module.css"

const TasksTab = () => {
  const { tasks, addTask, updateTask, deleteTask } = useApp()
  const { showSuccess, showError } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [imageFilter, setImageFilter] = useState("all")

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + N to add new task
      if ((e.ctrlKey || e.metaKey) && e.key === "n" && !isModalOpen) {
        e.preventDefault()
        handleAddTask()
      }
      // Escape to close modal
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen])

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesImage =
      imageFilter === "all" ||
      (imageFilter === "with-images" && task.image) ||
      (imageFilter === "without-images" && !task.image)

    return matchesSearch && matchesStatus && matchesImage
  })

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setImageFilter("all")
  }

  const handleAddTask = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        updateTask(editingTask._id, taskData)
      } else {
        await addTask(taskData)
        // showSuccess("Task created successfully")
      }
      setIsModalOpen(false)
      setEditingTask(null)
    } catch (error) {
      // showError("Failed to save task")
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  const hasActiveFilters = searchTerm !== "" || statusFilter !== "all" || imageFilter !== "all"

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Tasks</h2>
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          imageFilter={imageFilter}
          setImageFilter={setImageFilter}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          totalTasks={tasks.length}
          filteredCount={filteredTasks.length}
        />
      </div>

      <button className={styles.addButton} onClick={handleAddTask}>
        <svg className={styles.addIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add New Task
        {/* <span className={styles.shortcut}>Ctrl+N</span> */}
      </button>

      <div className={styles.tasksGrid}>
        {filteredTasks.length === 0 ? (
          <div className={styles.emptyState}>
            <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            {hasActiveFilters ? (
              <>
                <p>No tasks match your filters</p>
                <span>Try adjusting your search or filters</span>
                <button onClick={clearFilters} className={styles.clearFiltersButton}>
                  Clear Filters
                </button>
              </>
            ) : (
              <>
                <p>No tasks found</p>
                <span>Create your first task to get started</span>
              </>
            )}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} onEdit={handleEditTask} onDelete={deleteTask} />
          ))
        )}
      </div>

      {isModalOpen && <TaskModal task={editingTask} onSave={handleSaveTask} onClose={handleCloseModal} />}
    </div>
  )
}

export default TasksTab
