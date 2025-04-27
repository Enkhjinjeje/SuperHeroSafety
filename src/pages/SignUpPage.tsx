"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../context/Firebase"
import { useNavigate } from "react-router-dom"

const SignUpPage: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)
    try {
      const success = await signup(name, email, password)
      if (success) {
        navigate("/dashboard")
      } else {
        setError("Failed to create account. Please try again.")
      }
    } catch (err) {
      setError("An error occurred during sign up")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
      fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
    },
    formContainer: {
      width: "100%",
      maxWidth: "450px",
      padding: "2rem",
      borderRadius: "1rem",
      backgroundColor: "white",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      border: "2px solid #3B82F6",
    },
    header: {
      textAlign: "center" as const,
      marginBottom: "2rem",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#3B82F6",
      marginBottom: "0.5rem",
      fontFamily: "'Bangers', cursive",
      letterSpacing: "0.05em",
      textShadow: "2px 2px 0 #FF3B30",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#6B7280",
    },
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1.5rem",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "0.5rem",
    },
    label: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#4B5563",
    },
    input: {
      padding: "0.75rem",
      borderRadius: "0.5rem",
      border: "2px solid #E5E7EB",
      fontSize: "1rem",
      transition: "border-color 0.3s ease",
      outline: "none",
    },
    inputFocus: {
      borderColor: "#3B82F6",
    },
    button: {
      padding: "0.75rem",
      backgroundColor: "#3B82F6",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginTop: "1rem",
    },
    buttonHover: {
      backgroundColor: "#2563EB",
    },
    buttonDisabled: {
      backgroundColor: "#93C5FD",
      cursor: "not-allowed",
    },
    error: {
      color: "#EF4444",
      fontSize: "0.875rem",
      marginTop: "0.5rem",
    },
    loginLink: {
      textAlign: "center" as const,
      marginTop: "1.5rem",
      fontSize: "0.875rem",
      color: "#6B7280",
    },
    link: {
      color: "#3B82F6",
      textDecoration: "none",
      fontWeight: "500",
    },
    linkHover: {
      textDecoration: "underline",
    },
  }

  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const [hoveredButton, setHoveredButton] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(false)

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>Join the Hero Network</h1>
          <p style={styles.subtitle}>Create your superhero account today</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                ...styles.input,
                ...(focusedInput === "name" ? styles.inputFocus : {}),
              }}
              onFocus={() => setFocusedInput("name")}
              onBlur={() => setFocusedInput(null)}
              placeholder="Enter your superhero name"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                ...styles.input,
                ...(focusedInput === "email" ? styles.inputFocus : {}),
              }}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
              placeholder="hero@example.com"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...styles.input,
                ...(focusedInput === "password" ? styles.inputFocus : {}),
              }}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
              placeholder="Create a secure password"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                ...styles.input,
                ...(focusedInput === "confirmPassword" ? styles.inputFocus : {}),
              }}
              onFocus={() => setFocusedInput("confirmPassword")}
              onBlur={() => setFocusedInput(null)}
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.button,
              ...(hoveredButton ? styles.buttonHover : {}),
              ...(isLoading ? styles.buttonDisabled : {}),
            }}
            onMouseEnter={() => setHoveredButton(true)}
            onMouseLeave={() => setHoveredButton(false)}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div style={styles.loginLink}>
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              ...styles.link,
              ...(hoveredLink ? styles.linkHover : {}),
            }}
            onMouseEnter={() => setHoveredLink(true)}
            onMouseLeave={() => setHoveredLink(false)}
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
