"use client"

import type React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/Firebase"

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    } else {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  // Show a loading state while redirecting
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          border: "4px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "50%",
          borderTopColor: "#FFFFFF",
          animation: "spin 1s linear infinite",
          marginBottom: "2rem",
        }}
      ></div>
      <h2
        style={{
          color: "white",
          fontFamily: "'Bangers', cursive",
          fontSize: "2rem",
          letterSpacing: "0.05em",
          textShadow: "2px 2px 0 #FF3B30",
        }}
      >
        Superhero Safety Network
      </h2>
      <p style={{ color: "white", marginTop: "1rem" }}>Loading your superhero experience...</p>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}

export default HomePage
