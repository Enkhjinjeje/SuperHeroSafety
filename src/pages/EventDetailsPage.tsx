"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import UserProfileHeader from "../components/UserProfileHeader"
import { useAuth, db } from "../context/Firebase"
import { collection, getDocs } from "firebase/firestore";

// Define event type
interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  category: string
  image: string
  description: string
  attendees?: { id: string; name: string; profilePicture: string }[]
}


const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event | null>(null)
  const [isAttending, setIsAttending] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // State for hover effects
  const [hoveredButtons, setHoveredButtons] = useState<{ [key: string]: boolean }>({})
  const [hoveredAttendees, setHoveredAttendees] = useState<string | null>(null)

  useEffect(() => {
        const fetchEvents = async () => {
          try {
            const eventsSnapshot = await getDocs(collection(db, "events"));
            const eventsData = eventsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Event[];
            setAllEvents(eventsData);
            console.log(eventsData)
          } catch (error) {
            console.error("Error fetching events:", error);
          }
        };
    
        fetchEvents();
    }, []);
  
    useEffect(() => {
        // Simulate API call to fetch event details
        setIsLoading(true);
        setTimeout(() => {
          console.log('Searching for event with id:', eventId);
          const foundEvent = allEvents.find((e) => e.id === eventId);
          console.log('All events:', allEvents);
          console.log('Found event:', foundEvent);
          
          setEvent(foundEvent || null);

          if (foundEvent && foundEvent.attendees) {
            setIsAttending(foundEvent.attendees.some((attendee) => attendee.id === user?.id));
          }
      
          setIsLoading(false);
        }, 500);
      }, [eventId, user?.id, allEvents]); // Add allEvents as dependency to ensure it reloads

  const handleButtonHover = (buttonId: string, isHovered: boolean) => {
    setHoveredButtons((prev) => ({
      ...prev,
      [buttonId]: isHovered,
    }))
  }

  const handleJoinEvent = () => {
    // In a real app, this would make an API call to join the event
    setIsAttending(true)

    // Add the current user to attendees (for demo purposes)
    if (event && user) {
      const updatedAttendees = [
        ...(event.attendees || []),
        {
          id: user.id,
          name: user.name,
          profilePicture: user.profilePicture,
        },
      ]
      setEvent({
        ...event,
        attendees: updatedAttendees,
      })
    }
  }

  const handleLeaveEvent = () => {
    // In a real app, this would make an API call to leave the event
    setIsAttending(false)

    // Remove the current user from attendees (for demo purposes)
    if (event && user) {
      const updatedAttendees = (event.attendees || []).filter((attendee) => attendee.id !== user.id)
      setEvent({
        ...event,
        attendees: updatedAttendees,
      })
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#F3F4F6",
      fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
    },
    content: {
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "2rem",
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "#4B5563",
      fontSize: "0.875rem",
      fontWeight: "500",
      marginBottom: "1.5rem",
      cursor: "pointer",
      border: "none",
      background: "none",
      padding: "0.5rem",
      borderRadius: "0.375rem",
      transition: "background-color 0.3s ease",
    },
    backButtonHover: {
      backgroundColor: "#E5E7EB",
    },
    backIcon: {
      width: "1.25rem",
      height: "1.25rem",
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 0",
    },
    loadingSpinner: {
      width: "3rem",
      height: "3rem",
      border: "4px solid rgba(59, 130, 246, 0.2)",
      borderRadius: "50%",
      borderTopColor: "#3B82F6",
      animation: "spin 1s linear infinite",
      marginBottom: "1rem",
    },
    loadingText: {
      color: "#4B5563",
      fontSize: "1rem",
    },
    eventHeader: {
      position: "relative" as const,
      borderRadius: "0.75rem",
      overflow: "hidden",
      marginBottom: "2rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "2px solid #3B82F6",
    },
    eventImage: {
      width: "100%",
      height: "300px",
      objectFit: "cover" as const,
    },
    eventHeaderOverlay: {
      position: "absolute" as const,
      bottom: "0",
      left: "0",
      right: "0",
      padding: "2rem",
      background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
      color: "white",
    },
    eventCategory: {
      display: "inline-block",
      padding: "0.25rem 0.75rem",
      backgroundColor: "#3B82F6",
      color: "white",
      borderRadius: "9999px",
      fontSize: "0.75rem",
      fontWeight: "bold",
      marginBottom: "0.75rem",
      textTransform: "uppercase" as const,
    },
    eventTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "0.5rem",
      fontFamily: "'Bangers', cursive",
      letterSpacing: "0.05em",
      textShadow: "2px 2px 0 #000",
    },
    eventGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "2rem",
      "@media (max-width: 768px)": {
        gridTemplateColumns: "1fr",
      },
    },
    eventDetails: {
      backgroundColor: "white",
      borderRadius: "0.75rem",
      padding: "1.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "2px solid #3B82F6",
    },
    detailsTitle: {
      fontSize: "1.25rem",
      fontWeight: "700",
      color: "#1F2937",
      marginBottom: "1rem",
      fontFamily: "'Bangers', cursive",
      letterSpacing: "0.05em",
    },
    detailsList: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1rem",
      marginBottom: "1.5rem",
    },
    detailItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.75rem",
    },
    detailIcon: {
      width: "1.25rem",
      height: "1.25rem",
      color: "#3B82F6",
      flexShrink: 0,
      marginTop: "0.125rem",
    },
    detailContent: {
      flex: "1",
    },
    detailLabel: {
      fontSize: "0.875rem",
      fontWeight: "600",
      color: "#4B5563",
      marginBottom: "0.25rem",
    },
    detailValue: {
      fontSize: "1rem",
      color: "#1F2937",
    },
    description: {
      fontSize: "1rem",
      color: "#4B5563",
      lineHeight: "1.6",
      whiteSpace: "pre-line" as const,
    },
    sidebar: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1.5rem",
    },
    actionCard: {
      backgroundColor: "white",
      borderRadius: "0.75rem",
      padding: "1.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "2px solid #3B82F6",
    },
    actionButton: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#3B82F6",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    actionButtonHover: {
      backgroundColor: "#2563EB",
    },
    leaveButton: {
      backgroundColor: "#EF4444",
    },
    leaveButtonHover: {
      backgroundColor: "#DC2626",
    },
    attendeesCard: {
      backgroundColor: "white",
      borderRadius: "0.75rem",
      padding: "1.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "2px solid #3B82F6",
    },
    attendeesList: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1rem",
    },
    attendeeItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "0.5rem",
      borderRadius: "0.375rem",
      transition: "background-color 0.3s ease",
    },
    attendeeItemHover: {
      backgroundColor: "#F3F4F6",
    },
    attendeeImage: {
      width: "2.5rem",
      height: "2.5rem",
      borderRadius: "50%",
      objectFit: "cover" as const,
      border: "2px solid #3B82F6",
    },
    attendeeName: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#1F2937",
    },
    noAttendeesMessage: {
      fontSize: "0.875rem",
      color: "#6B7280",
      fontStyle: "italic",
      textAlign: "center" as const,
      padding: "1rem 0",
    },
    shareSection: {
      display: "flex",
      gap: "0.75rem",
      marginTop: "1rem",
    },
    shareButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2.5rem",
      height: "2.5rem",
      borderRadius: "50%",
      backgroundColor: "#F3F4F6",
      color: "#4B5563",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    shareButtonHover: {
      backgroundColor: "#E5E7EB",
      transform: "translateY(-2px)",
    },
    shareIcon: {
      width: "1.25rem",
      height: "1.25rem",
    },
    notFoundContainer: {
      textAlign: "center" as const,
      padding: "4rem 0",
    },
    notFoundIcon: {
      width: "4rem",
      height: "4rem",
      margin: "0 auto 1.5rem",
      color: "#9CA3AF",
    },
    notFoundTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#4B5563",
      marginBottom: "0.5rem",
    },
    notFoundText: {
      fontSize: "1rem",
      color: "#6B7280",
      marginBottom: "1.5rem",
    },
  }

  if (isLoading) {
    return (
      <div style={styles.container}>
        <UserProfileHeader />
        <div style={styles.content}>
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Loading event details...</p>
            <style>
              {`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div style={styles.container}>
        <UserProfileHeader />
        <div style={styles.content}>
          <button
            style={{
              ...styles.backButton,
              ...(hoveredButtons["back"] ? styles.backButtonHover : {}),
            }}
            onClick={handleGoBack}
            onMouseEnter={() => handleButtonHover("back", true)}
            onMouseLeave={() => handleButtonHover("back", false)}
          >
            <svg style={styles.backIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 19L3 12L10 5L11.41 6.41L6.83 11H21V13H6.83L11.41 17.59L10 19Z" fill="currentColor" />
            </svg>
            Back
          </button>

          <div style={styles.notFoundContainer}>
            <svg style={styles.notFoundIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
                fill="currentColor"
              />
            </svg>
            <h3 style={styles.notFoundTitle}>Event Not Found</h3>
            <p style={styles.notFoundText}>The event you're looking for doesn't exist or has been removed.</p>
            <button
              style={{
                ...styles.actionButton,
                ...(hoveredButtons["browse"] ? styles.actionButtonHover : {}),
              }}
              onClick={() => navigate("/dashboard")}
              onMouseEnter={() => handleButtonHover("browse", true)}
              onMouseLeave={() => handleButtonHover("browse", false)}
            >
              Browse Events
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <UserProfileHeader />
      <div style={styles.content}>
        <button
          style={{
            ...styles.backButton,
            ...(hoveredButtons["back"] ? styles.backButtonHover : {}),
          }}
          onClick={handleGoBack}
          onMouseEnter={() => handleButtonHover("back", true)}
          onMouseLeave={() => handleButtonHover("back", false)}
        >
          <svg style={styles.backIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 19L3 12L10 5L11.41 6.41L6.83 11H21V13H6.83L11.41 17.59L10 19Z" fill="currentColor" />
          </svg>
          Back
        </button>

        <div style={styles.eventHeader}>
          <img src={event.image || "/placeholder.svg"} alt={event.title} style={styles.eventImage} />
          <div style={styles.eventHeaderOverlay}>
            <span style={styles.eventCategory}>{event.category}</span>
            <h1 style={styles.eventTitle}>{event.title}</h1>
          </div>
        </div>

        <div
          style={{
            ...styles.eventGrid,
            gridTemplateColumns: window.innerWidth <= 768 ? "1fr" : "2fr 1fr",
          }}
        >
          <div style={styles.eventDetails}>
            <h2 style={styles.detailsTitle}>Event Details</h2>
            <div style={styles.detailsList}>
              <div style={styles.detailItem}>
                <svg style={styles.detailIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8ZM9 14H7V12H9V14ZM13 14H11V12H13V14ZM17 14H15V12H17V14ZM9 18H7V16H9V18ZM13 18H11V16H13V18ZM17 18H15V16H17V18Z"
                    fill="currentColor"
                  />
                </svg>
                <div style={styles.detailContent}>
                  <div style={styles.detailLabel}>Date</div>
                  <div style={styles.detailValue}>{event.date}</div>
                </div>
              </div>

              <div style={styles.detailItem}>
                <svg style={styles.detailIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"
                    fill="currentColor"
                  />
                </svg>
                <div style={styles.detailContent}>
                  <div style={styles.detailLabel}>Time</div>
                  <div style={styles.detailValue}>{event.time}</div>
                </div>
              </div>

              <div style={styles.detailItem}>
                <svg style={styles.detailIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                    fill="currentColor"
                  />
                </svg>
                <div style={styles.detailContent}>
                  <div style={styles.detailLabel}>Location</div>
                  <div style={styles.detailValue}>{event.location}</div>
                </div>
              </div>

              <div style={styles.detailItem}>
                <svg style={styles.detailIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z"
                    fill="currentColor"
                  />
                </svg>
                <div style={styles.detailContent}>
                  <div style={styles.detailLabel}>Attendees</div>
                  <div style={styles.detailValue}>{event.attendees?.length || 0} heroes attending</div>
                </div>
              </div>
            </div>

            <h3 style={styles.detailsTitle}>Description</h3>
            <p style={styles.description}>{event.description}</p>

            <h3 style={{ ...styles.detailsTitle, marginTop: "1.5rem" }}>Share This Event</h3>
            <div style={styles.shareSection}>
              <button
                style={{
                  ...styles.shareButton,
                  ...(hoveredButtons["share-facebook"] ? styles.shareButtonHover : {}),
                }}
                onMouseEnter={() => handleButtonHover("share-facebook", true)}
                onMouseLeave={() => handleButtonHover("share-facebook", false)}
                aria-label="Share on Facebook"
              >
                <svg
                  style={styles.shareIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>

              <button
                style={{
                  ...styles.shareButton,
                  ...(hoveredButtons["share-twitter"] ? styles.shareButtonHover : {}),
                }}
                onMouseEnter={() => handleButtonHover("share-twitter", true)}
                onMouseLeave={() => handleButtonHover("share-twitter", false)}
                aria-label="Share on Twitter"
              >
                <svg
                  style={styles.shareIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>

              <button
                style={{
                  ...styles.shareButton,
                  ...(hoveredButtons["share-email"] ? styles.shareButtonHover : {}),
                }}
                onMouseEnter={() => handleButtonHover("share-email", true)}
                onMouseLeave={() => handleButtonHover("share-email", false)}
                aria-label="Share via Email"
              >
                <svg
                  style={styles.shareIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div style={styles.sidebar}>
            <div style={styles.actionCard}>
              {isAttending ? (
                <button
                  style={{
                    ...styles.actionButton,
                    ...styles.leaveButton,
                    ...(hoveredButtons["leave"] ? styles.leaveButtonHover : {}),
                  }}
                  onClick={handleLeaveEvent}
                  onMouseEnter={() => handleButtonHover("leave", true)}
                  onMouseLeave={() => handleButtonHover("leave", false)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
                      fill="currentColor"
                    />
                  </svg>
                  Leave Event
                </button>
              ) : (
                <button
                  style={{
                    ...styles.actionButton,
                    ...(hoveredButtons["join"] ? styles.actionButtonHover : {}),
                  }}
                  onClick={handleJoinEvent}
                  onMouseEnter={() => handleButtonHover("join", true)}
                  onMouseLeave={() => handleButtonHover("join", false)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15 8H9V6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8Z"
                      fill="currentColor"
                    />
                  </svg>
                  Join Event
                </button>
              )}
            </div>

            <div style={styles.attendeesCard}>
              <h3 style={styles.detailsTitle}>Attending Heroes</h3>
              {event.attendees && event.attendees.length > 0 ? (
                <div style={styles.attendeesList}>
                  {event.attendees.map((attendee) => (
                    <div
                      key={attendee.id}
                      style={{
                        ...styles.attendeeItem,
                        ...(hoveredAttendees === attendee.id ? styles.attendeeItemHover : {}),
                      }}
                      onMouseEnter={() => setHoveredAttendees(attendee.id)}
                      onMouseLeave={() => setHoveredAttendees(null)}
                    >
                      <img
                        src={attendee.profilePicture || "/placeholder.svg"}
                        alt={attendee.name}
                        style={styles.attendeeImage}
                      />
                      <span style={styles.attendeeName}>{attendee.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={styles.noAttendeesMessage}>No heroes have joined this event yet. Be the first!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsPage
