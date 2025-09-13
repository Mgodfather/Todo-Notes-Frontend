"use client"

import { useState } from "react"
import { useApp } from "../../contexts/AppContext"
import { useToast } from "../../contexts/ToastContext"
import NoteCard from "./NoteCard"
import AddNoteCard from "./AddNoteCard"
import styles from "./notesTab.module.css"

const NotesTab = () => {
  const { notes, addNote, deleteNote } = useApp()
  const { showSuccess, showError } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  // Filter notes based on search
  const filteredNotes = notes.filter((note) => note.content.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Notes</h2>
        <div className={styles.searchContainer}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.notesContainer}>
        <AddNoteCard onAddNote={addNote} />

        {filteredNotes.length === 0 && searchTerm === "" ? (
          <div className={styles.emptyState}>
            <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10,9 9,9 8,9" />
            </svg>
            <p>No notes yet</p>
            <span>Click above to add your first note</span>
          </div>
        ) : filteredNotes.length === 0 && searchTerm !== "" ? (
          <div className={styles.emptyState}>
            <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <p>No notes found</p>
            <span>Try a different search term</span>
          </div>
        ) : (
          filteredNotes.map((note) => <NoteCard key={note._id} note={note} onDelete={deleteNote} />)
        )}
      </div>
    </div>
  )
}

export default NotesTab
