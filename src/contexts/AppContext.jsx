"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { apiRequest } from "../utils/api"
import { useToast } from "./ToastContext"

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark")
  const [tasks, setTasks] = useState([])
  const [notes, setNotes] = useState([])

  const { showSuccess, showError } = useToast()

  const [isChange, setIsChange] = useState(false)

  // Initialize with dummy data
  useEffect(() => {
    // const dummyTasks = [
    //   {
    //     id: "1",
    //     title: "Complete project proposal",
    //     description: "Write and submit the Q4 project proposal",
    //     status: "pending",
    //     image: null,
    //     createdAt: new Date("2025-09-13").toISOString(),
    //   },
    //   {
    //     id: "2",
    //     title: "Review code changes",
    //     description: "Review pull requests from the development team",
    //     status: "completed",
    //     image: null,
    //     createdAt: new Date("2025-09-13").toISOString(),
    //   },
    // ]

    // const dummyNotes = [
    //   {
    //     id: "1",
    //     content: "Remember to update the documentation for the new API endpoints.",
    //     createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    //   },
    //   {
    //     id: "2",
    //     content: "Meeting notes: Discussed project timeline and resource allocation. Next review scheduled for Friday.",
    //     createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    //   },
    // ]

    const fetchTasks = async () => {
      try {
        const response = await apiRequest({
          method: 'GET',
          url: '/tasks', // Just the endpoint
        });
        setTasks(response?.data?.tasks)
      } catch (error) {
        console.log(error);
      }
    }

    const fetchNotes = async () => {
      try {
        const response = await apiRequest({
          method: 'GET',
          url: '/notes', // Just the endpoint
        });
        setNotes(response?.data?.notes)
      } catch (error) {
        console.log(error);
      }
    }

    fetchTasks()
    fetchNotes()
    // setTasks(dummyTasks)
    // setNotes(dummyNotes)
  }, [isChange])

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark"
    setTheme(savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  // Task management functions
  const addTask = async (taskData) => {

    // Create FormData object
    const formData = new FormData();

    // Add text fields
    formData.append('title', taskData.title); // "my task"
    formData.append('description', taskData.description); // "hello mayank ji"
    formData.append('status', taskData.status); // "pending"

    if (taskData.image && taskData.image.startsWith('data:image/')) {
      // Convert base64 to blob
      const response = await fetch(taskData.image);
      const blob = await response.blob();
      formData.append('image', blob, 'image.png'); // Creates a file-like object
    }

    try {
      const response = await apiRequest({
        method: "POST",
        url: '/tasks',
        data: formData,
      })
      setIsChange(p => !p)
      showSuccess("Task created successfully")
    } catch (error) {
      showError("Failed to save task")
      console.log(error)
    }
  }

  const updateTask = async (id, updates) => {
    // Create FormData object
    const formData = new FormData();
    // Add text fields
    formData.append('title', updates.title); // "my task"
    formData.append('description', updates.description); // "hello mayank ji"
    formData.append('status', updates.status); // "pending"

    if (updates.image && updates.image.startsWith('data:image/')) {
      // Convert base64 to blob
      const response = await fetch(updates.image);
      const blob = await response.blob();
      formData.append('image', blob, 'image.png'); // Creates a file-like object
    }

    try {
      const response = await apiRequest({
        method: "PUT",
        url: `/tasks/${id}`,
        data: formData,
      })
      console.log(response);
      setIsChange(p => !p)
      showSuccess("Task updated successfully")
    } catch (error) {
      showError("Failed to update task")
      console.log(error)
    }

  }

  const deleteTask = async (id) => {
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: `/tasks/${id}`, // Just the endpoint
      });
      showSuccess("Task deleted successfully")
      setIsChange(p => !p)
    } catch (error) {
      console.log(error);
      showError("Failed to delete task")
    }
  }

  // Note management functions
  const addNote = async (content) => {
    console.log(content);
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/notes', // Just the endpoint
        data: { content }
      });
      console.log(response);
      showSuccess("Note Added successfully")
      setIsChange(p => !p)
    } catch (error) {
      console.log(error);
      showError("Failed to Add note")
    }
  }

  const deleteNote = async (id) => {
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: `/notes/${id}`, // Just the endpoint
      });
      showSuccess("note deleted successfully")
      setIsChange(p => !p)
    } catch (error) {
      console.log(error);
      showError("Failed to delete note")
    }

}

const value = {
  theme,
  toggleTheme,
  tasks,
  notes,
  addTask,
  updateTask,
  deleteTask,
  addNote,
  deleteNote,
}

return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
