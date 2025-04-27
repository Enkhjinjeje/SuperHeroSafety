"use client"

import React from "react"
import { useNavigate } from "react-router-dom"

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()
  const [isButtonHovered, setIsButtonHovered] = React.useState(false)

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
      fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
      textAlign: "center" as const,
    },
    errorCode: {
      fontSize: "8rem",
      fontWeight: "700",
      color: "white",
      marginBottom: "1rem",
      fontFamily: "'Bangers', cursive",
      letterSpacing: "0.05em",
      textShadow: "4px 4px 0 #FF3B30",
      lineHeight: "1",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "white",
      marginBottom: "1rem",
      fontFamily: "'Bangers', cursive",
      letterSpacing: "0.05em",
      textShadow: "2px 2px 0 #FF3B30",
    },
    description: {
      fontSize: "1.25rem",
      color: "white",
      marginBottom: "2rem",
      maxWidth: "600px",
    },
    button: {
      padding: "0.75rem 1.5rem",
      backgroundColor: "white",
      color: "#3B82F6",
      border: "none",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    buttonHover: {
      backgroundColor: "#F3F4F6",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
    },
    icon: {
      width: "1.25rem",
      height: "1.25rem",
    },
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.title}>Page Not Found</h2>
      <p style={styles.description}>
        Oops! The superhero mission you're looking for seems to have disappeared into another dimension.
      </p>
      <button
        style={{
          ...styles.button,
          ...(isButtonHovered ? styles.buttonHover : {}),
        }}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        onClick={() => navigate("/")}
      >
        <svg style={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 19L3 12L10 5L11.41 6.41L6.83 11H21V13H6.83L11.41 17.59L10 19Z" fill="currentColor" />
        </svg>
        Return to Headquarters
      </button>
    </div>
  )
}

export default NotFoundPage
