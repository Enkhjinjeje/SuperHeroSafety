"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../context/Firebase"
import { useNavigate } from "react-router-dom"
import logo from "../public/images/logo.png"

const UserProfileHeader: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleProfileClick = () => {
    navigate("/user-events")
  }

  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: "#3B82F6",
      color: "white",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    logoText: {
      fontSize: "1.5rem",
      fontWeight: "700",
      fontFamily: "'Bangers', cursive",
      letterSpacing: "0.05em",
      textShadow: "1px 1px 0 #FF3B30",
    },
    profileSection: {
      position: "relative" as const,
    },
    profileButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "none",
      border: "none",
      color: "white",
      cursor: "pointer",
      padding: "0.5rem",
      borderRadius: "0.5rem",
      transition: "background-color 0.3s ease",
    },
    profileButtonHover: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    profileImage: {
      width: "2.5rem",
      height: "2.5rem",
      borderRadius: "50%",
      border: "2px solid white",
      objectFit: "cover" as const,
    },
    profileName: {
      fontWeight: "500",
    },
    dropdown: {
      position: "absolute" as const,
      top: "100%",
      right: 0,
      marginTop: "0.5rem",
      backgroundColor: "white",
      borderRadius: "0.5rem",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      width: "200px",
      zIndex: 10,
      overflow: "hidden",
      border: "2px solid #3B82F6",
    },
    dropdownItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.75rem 1rem",
      color: "#4B5563",
      textDecoration: "none",
      transition: "background-color 0.3s ease",
      cursor: "pointer",
    },
    dropdownItemHover: {
      backgroundColor: "#F3F4F6",
    },
    dropdownIcon: {
      width: "1.25rem",
      height: "1.25rem",
      color: "#6B7280",
    },
    divider: {
      height: "1px",
      backgroundColor: "#E5E7EB",
      margin: "0.25rem 0",
    },
    logoutItem: {
      color: "#EF4444",
    },
    logoutIcon: {
      color: "#EF4444",
    },
  }

  const [hoveredButton, setHoveredButton] = useState(false)
  const [hoveredItems, setHoveredItems] = useState<number | null>(null)

  if (!user) {
    return null
  }

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <img src={logo} alt="Logo" width={32} height={32} />
        <span style={styles.logoText}>Superhero Safety Network</span>
      </div>

      <div style={styles.profileSection}>
        <button
          style={{
            ...styles.profileButton,
            ...(hoveredButton ? styles.profileButtonHover : {}),
          }}
          onClick={toggleDropdown}
          onMouseEnter={() => setHoveredButton(true)}
          onMouseLeave={() => setHoveredButton(false)}
        >
          <img src={user.profilePicture || "/placeholder.svg"} alt={user.name} style={styles.profileImage} />
          <span style={styles.profileName}>{user.name}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div style={styles.dropdown}>
            <div
              style={{
                ...styles.dropdownItem,
                ...(hoveredItems === 0 ? styles.dropdownItemHover : {}),
              }}
              onClick={handleProfileClick}
              onMouseEnter={() => setHoveredItems(0)}
              onMouseLeave={() => setHoveredItems(null)}
            >
              <svg style={styles.dropdownIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
                  fill="currentColor"
                />
              </svg>
              My Profile
            </div>

            <div style={styles.divider}></div>

            <div
              style={{
                ...styles.dropdownItem,
                ...styles.logoutItem,
                ...(hoveredItems === 3 ? styles.dropdownItemHover : {}),
              }}
              onClick={handleLogout}
              onMouseEnter={() => setHoveredItems(3)}
              onMouseLeave={() => setHoveredItems(null)}
            >
              <svg
                style={{ ...styles.dropdownIcon, ...styles.logoutIcon }}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
                  fill="currentColor"
                />
              </svg>
              Log Out
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default UserProfileHeader
