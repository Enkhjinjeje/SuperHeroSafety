"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import UserProfileHeader from "../components/UserProfileHeader"
import { useAuth } from "../context/Firebase"
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore"
import { db } from "../context/Firebase"

const CreateEventPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  // Form state
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [hoveredButtons, setHoveredButtons] = useState<{ [key: string]: boolean }>({})
  const [focusedInputs, setFocusedInputs] = useState<{ [key: string]: boolean }>({})

  const handleButtonHover = (buttonId: string, isHovered: boolean) => {
    setHoveredButtons((prev) => ({
      ...prev,
      [buttonId]: isHovered,
    }))
  }

  const handleInputFocus = (inputId: string, isFocused: boolean) => {
    setFocusedInputs((prev) => ({
      ...prev,
      [inputId]: isFocused,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    // Validate form
    if (!title || !category || !date || !time || !location || !description) {
      setError("All fields except image are required")
      return
    }
  
    setIsSubmitting(true)
    setError("")
  
    try {
      // Create a new event in Firestore
      const eventsCollection = collection(db, "events")
      await addDoc(eventsCollection, {
        title,
        category,
        date,
        time,
        location,
        description,
        image, // Assuming you have an image URL or base64 string
      })
      setIsSubmitting(false)
      navigate("/dashboard") // Redirect to the dashboard or event page
    } catch (error) {
      setIsSubmitting(false)
      setError("Error creating event")
      console.error("Error creating event:", error)
    }
  }

  const handleCancel = () => {
    navigate("/dashboard")
  }

  // Available categories
  const categories = ["Training", "Alert", "Community", "Social", "Rescue"]

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#F3F4F6",
      fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
    },
    content: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem",
    },
    pageTitle: {
      fontSize: "1.75rem",
      fontWeight: "700",
      color: "#1F2937",
      marginBottom: "1.5rem",
      fontFamily: "'Bangers', cursive",
      letterSpacing: "0.05em",
    },
    formCard: {
      backgroundColor: "white",
      borderRadius: "0.75rem",
      padding: "1.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "2px solid #3B82F6",
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
      fontWeight: "600",
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
    inputFocused: {
      borderColor: "#3B82F6",
    },
    select: {
      padding: "0.75rem",
      borderRadius: "0.5rem",
      border: "2px solid #E5E7EB",
      fontSize: "1rem",
      transition: "border-color 0.3s ease",
      outline: "none",
      backgroundColor: "white",
    },
    textarea: {
      padding: "0.75rem",
      borderRadius: "0.5rem",
      border: "2px solid #E5E7EB",
      fontSize: "1rem",
      transition: "border-color 0.3s ease",
      outline: "none",
      minHeight: "150px",
      resize: "vertical" as const,
    },
    error: {
      color: "#EF4444",
      fontSize: "0.875rem",
      marginTop: "0.5rem",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "1rem",
      marginTop: "1rem",
    },
    button: {
      padding: "0.75rem 1.5rem",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    cancelButton: {
      backgroundColor: "white",
      color: "#4B5563",
      border: "2px solid #E5E7EB",
    },
    cancelButtonHover: {
      backgroundColor: "#F3F4F6",
      borderColor: "#D1D5DB",
    },
    submitButton: {
      backgroundColor: "#3B82F6",
      color: "white",
      border: "none",
    },
    submitButtonHover: {
      backgroundColor: "#2563EB",
    },
    submitButtonDisabled: {
      backgroundColor: "#93C5FD",
      cursor: "not-allowed",
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1.5rem",
      "@media (max-width: 640px)": {
        gridTemplateColumns: "1fr",
      },
    },
  }

  if (!user) {
    return <div>Please log in to create an event</div>
  }

  return (
    <div style={styles.container}>
      <UserProfileHeader />
      <div style={styles.content}>
        <h1 style={styles.pageTitle}>Create New Event</h1>

        <div style={styles.formCard}>
          {error && <div style={styles.error}>{error}</div>}

          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="title" style={styles.label}>
                Event Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  ...styles.input,
                  ...(focusedInputs["title"] ? styles.inputFocused : {}),
                }}
                onFocus={() => handleInputFocus("title", true)}
                onBlur={() => handleInputFocus("title", false)}
                placeholder="Enter event title"
              />
            </div>

            <div
              style={{
                ...styles.formRow,
                gridTemplateColumns: window.innerWidth <= 640 ? "1fr" : "1fr 1fr",
              }}
            >
              <div style={styles.formGroup}>
                <label htmlFor="category" style={styles.label}>
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    ...styles.select,
                    ...(focusedInputs["category"] ? styles.inputFocused : {}),
                  }}
                  onFocus={() => handleInputFocus("category", true)}
                  onBlur={() => handleInputFocus("category", false)}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="location" style={styles.label}>
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{
                    ...styles.input,
                    ...(focusedInputs["location"] ? styles.inputFocused : {}),
                  }}
                  onFocus={() => handleInputFocus("location", true)}
                  onBlur={() => handleInputFocus("location", false)}
                  placeholder="Enter event location"
                />
              </div>
            </div>

            <div
              style={{
                ...styles.formRow,
                gridTemplateColumns: window.innerWidth <= 640 ? "1fr" : "1fr 1fr",
              }}
            >
              <div style={styles.formGroup}>
                <label htmlFor="date" style={styles.label}>
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    ...styles.input,
                    ...(focusedInputs["date"] ? styles.inputFocused : {}),
                  }}
                  onFocus={() => handleInputFocus("date", true)}
                  onBlur={() => handleInputFocus("date", false)}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="time" style={styles.label}>
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  style={{
                    ...styles.input,
                    ...(focusedInputs["time"] ? styles.inputFocused : {}),
                  }}
                  onFocus={() => handleInputFocus("time", true)}
                  onBlur={() => handleInputFocus("time", false)}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="image" style={styles.label}>
                Image URL (Optional)
              </label>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                style={{
                  ...styles.input,
                  ...(focusedInputs["image"] ? styles.inputFocused : {}),
                }}
                onFocus={() => handleInputFocus("image", true)}
                onBlur={() => handleInputFocus("image", false)}
                placeholder="Enter image URL"
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="description" style={styles.label}>
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  ...styles.textarea,
                  ...(focusedInputs["description"] ? styles.inputFocused : {}),
                }}
                onFocus={() => handleInputFocus("description", true)}
                onBlur={() => handleInputFocus("description", false)}
                placeholder="Describe the event details, requirements, and any other important information"
              />
            </div>

            <div style={styles.buttonGroup}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  ...styles.button,
                  ...styles.cancelButton,
                  ...(hoveredButtons["cancel"] ? styles.cancelButtonHover : {}),
                }}
                onMouseEnter={() => handleButtonHover("cancel", true)}
                onMouseLeave={() => handleButtonHover("cancel", false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  ...styles.button,
                  ...styles.submitButton,
                  ...(hoveredButtons["submit"] && !isSubmitting ? styles.submitButtonHover : {}),
                  ...(isSubmitting ? styles.submitButtonDisabled : {}),
                }}
                onMouseEnter={() => handleButtonHover("submit", true)}
                onMouseLeave={() => handleButtonHover("submit", false)}
              >
                {isSubmitting ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateEventPage
