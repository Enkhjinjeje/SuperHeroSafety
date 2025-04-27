"use client"

import React from "react"

interface EventCardProps {
  title: string
  category: string
  distance: string
  description: string
  imageSrc: string
  imageAlt: string
}

const styles = {
  container: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    paddingBottom: "1.5rem",
    borderBottom: "2px solid #3B82F6",
    marginBottom: "1.5rem",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },
  containerHover: {
    transform: "translateY(-5px)",
  },
  imageContainer: {
    border: "2px solid #3B82F6",
    borderRadius: "0.75rem",
    overflow: "hidden",
    flexShrink: 0,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover" as const,
    borderRadius: "0.5rem",
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "700",
    fontSize: "1.25rem",
    marginBottom: "0.25rem",
    color: "#3B82F6",
    fontFamily: "'Bangers', cursive",
    letterSpacing: "0.05em",
  },
  meta: {
    fontSize: "0.875rem",
    color: "#6b7280",
    marginBottom: "0.25rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  categoryBadge: {
    display: "inline-block",
    padding: "0.125rem 0.5rem",
    backgroundColor: "#FF3B30",
    color: "white",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
  },
  description: {
    fontSize: "0.875rem",
    color: "#4B5563",
    lineHeight: "1.5",
  },
  favoriteButton: {
    flexShrink: 0,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "transform 0.3s ease",
  },
  favoriteButtonHover: {
    transform: "scale(1.2)",
  },
  heartIcon: {
    width: "1.5rem",
    height: "1.5rem",
    color: "#FF3B30",
  },
}

export function EventCard({ title, category, distance, description, imageSrc, imageAlt }: EventCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isFavoriteHovered, setIsFavoriteHovered] = React.useState(false)

  return (
    <div
      style={{
        ...styles.container,
        ...(isHovered ? styles.containerHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageContainer}>
        <img src={imageSrc || "/placeholder.svg"} alt={imageAlt} style={styles.image} />
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.meta}>
          <span style={styles.categoryBadge}>{category}</span>
          <span>{distance}</span>
        </p>
        <p style={styles.description}>{description}</p>
      </div>
      <button
        style={{
          ...styles.favoriteButton,
          ...(isFavoriteHovered ? styles.favoriteButtonHover : {}),
        }}
        aria-label="Add to favorites"
        onMouseEnter={() => setIsFavoriteHovered(true)}
        onMouseLeave={() => setIsFavoriteHovered(false)}
      >
        <svg style={styles.heartIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
