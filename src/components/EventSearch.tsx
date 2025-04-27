"use client"

import type React from "react"
import { useState } from "react"

interface EventSearchProps {
  onSearch: (query: string) => void
}

const EventSearch: React.FC<EventSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const styles = {
    searchContainer: {
      marginBottom: "1.5rem",
    },
    searchForm: {
      display: "flex",
      maxWidth: "600px",
    },
    searchInput: {
      flex: "1",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem 0 0 0.5rem",
      border: "2px solid #E5E7EB",
      borderRight: "none",
      fontSize: "1rem",
      transition: "border-color 0.3s ease",
      outline: "none",
    },
    searchInputFocused: {
      borderColor: "#3B82F6",
    },
    searchButton: {
      padding: "0.75rem 1.25rem",
      backgroundColor: "#3B82F6",
      color: "white",
      border: "none",
      borderRadius: "0 0.5rem 0.5rem 0",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    searchButtonHover: {
      backgroundColor: "#2563EB",
    },
    searchIcon: {
      width: "1.25rem",
      height: "1.25rem",
    },
  }

  return (
    <div style={styles.searchContainer}>
      <form style={styles.searchForm} onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search events by title, location, or category..."
          style={{
            ...styles.searchInput,
            ...(isFocused ? styles.searchInputFocused : {}),
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          type="submit"
          style={{
            ...styles.searchButton,
            ...(isHovered ? styles.searchButtonHover : {}),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg style={styles.searchIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
              fill="currentColor"
            />
          </svg>
          Search
        </button>
      </form>
    </div>
  )
}

export default EventSearch
