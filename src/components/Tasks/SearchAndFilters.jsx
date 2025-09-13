"use client"

import styles from "./searchAndFilters.module.css"

const SearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  imageFilter,
  setImageFilter,
  onClearFilters,
  hasActiveFilters,
  totalTasks,
  filteredCount,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button className={styles.clearSearch} onClick={() => setSearchTerm("")} aria-label="Clear search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <div className={styles.filters}>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={styles.select}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select value={imageFilter} onChange={(e) => setImageFilter(e.target.value)} className={styles.select}>
          <option value="all">All Tasks</option>
          <option value="with-images">With Images</option>
          <option value="without-images">Without Images</option>
        </select>

        {hasActiveFilters && (
          <button onClick={onClearFilters} className={styles.clearButton}>
            Clear Filters
          </button>
        )}
      </div>

      {totalTasks > 0 && (
        <div className={styles.resultsInfo}>
          {hasActiveFilters ? (
            <span>
              Showing {filteredCount} of {totalTasks} tasks
            </span>
          ) : (
            <span>
              {totalTasks} task{totalTasks !== 1 ? "s" : ""} total
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchAndFilters
