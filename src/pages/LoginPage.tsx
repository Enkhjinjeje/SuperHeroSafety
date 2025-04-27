"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../context/Firebase"
import { useNavigate } from "react-router-dom"

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!email || !password) {
      setError("Email and password are required")
      return
    }

    setIsLoading(true)
    try {
      const success = await login(email, password)
      if (success) {
        navigate("/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred during login")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    const success = await signInWithGoogle()
    if (success) {
        navigate("/dashboard")
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
      maxWidth: "400px",
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
    forgotPassword: {
      fontSize: "0.75rem",
      color: "#3B82F6",
      textAlign: "right" as const,
      textDecoration: "none",
    },
    forgotPasswordHover: {
      textDecoration: "underline",
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
    signupLink: {
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
    divider: {
      display: "flex",
      alignItems: "center",
      margin: "1.5rem 0",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      backgroundColor: "#E5E7EB",
    },
    dividerText: {
      padding: "0 1rem",
      color: "#6B7280",
      fontSize: "0.875rem",
    },
    socialButtons: {
      display: "flex",
      gap: "1rem",
    },
    socialButton: {
      flex: 1,
      padding: "0.75rem",
      border: "2px solid #E5E7EB",
      borderRadius: "0.5rem",
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    socialButtonHover: {
      backgroundColor: "#F3F4F6",
    },
    socialIcon: {
      width: "1.5rem",
      height: "1.5rem",
    },
  }

  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const [hoveredButton, setHoveredButton] = useState(false)
  const [hoveredForgotPassword, setHoveredForgotPassword] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(false)
  const [hoveredSocialButtons, setHoveredSocialButtons] = useState<number | null>(null)

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>Hero Login</h1>
          <p style={styles.subtitle}>Access your superhero dashboard</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form style={styles.form} onSubmit={handleSubmit}>
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <a
                href="/forgot-password"
                style={{
                  ...styles.forgotPassword,
                  ...(hoveredForgotPassword ? styles.forgotPasswordHover : {}),
                }}
                onMouseEnter={() => setHoveredForgotPassword(true)}
                onMouseLeave={() => setHoveredForgotPassword(false)}
              >
                Forgot password?
              </a>
            </div>
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
              placeholder="Enter your password"
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
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine}></div>
        </div>

        <div style={styles.socialButtons}>
          <button
            type="button"
            style={{
              ...styles.socialButton,
              ...(hoveredSocialButtons === 0 ? styles.socialButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredSocialButtons(0)}
            onMouseLeave={() => setHoveredSocialButtons(null)}
            onClick={() => handleGoogleLogin()}
          >
            <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="#4285F4">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
          </button>
        </div>

        <div style={styles.signupLink}>
          Don't have an account?{" "}
          <a
            href="/signup"
            style={{
              ...styles.link,
              ...(hoveredLink ? styles.linkHover : {}),
            }}
            onMouseEnter={() => setHoveredLink(true)}
            onMouseLeave={() => setHoveredLink(false)}
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
