"use client";

import type React from "react";
import { useState } from "react";
import { useAuth } from "../context/Firebase";
import UserProfileHeader from "../components/UserProfileHeader";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const UserEventsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("attending");

  const navigate = useNavigate()
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [hoveredEvents, setHoveredEvents] = useState<number[]>([]);
  const [hoveredButtons, setHoveredButtons] = useState<{
    [key: string]: boolean;
  }>({});

  const handleButtonHover = (
    eventId: string,
    buttonType: string,
    isHovered: boolean
  ) => {
    setHoveredButtons((prevHoveredButtons) => ({
      ...prevHoveredButtons,
      [`${eventId}-${buttonType}`]: isHovered,
    }));
  };

  const handleEventHover = (eventId: string, isHovered: boolean) => {
    const eventIdInt = Number.parseInt(eventId, 10);
    if (isNaN(eventIdInt)) {
      console.error(`Invalid eventId: ${eventId}`);
      return;
    }
    setHoveredEvents((prevHoveredEvents) => {
      if (isHovered) {
        // Only add if not already included
        if (!prevHoveredEvents.includes(eventIdInt)) {
          return [...prevHoveredEvents, eventIdInt];
        }
        return prevHoveredEvents;
      } else {
        return prevHoveredEvents.filter((id) => id !== eventIdInt);
      }
    });
  };
  const handleReturnButtonHover = (buttonId: string, isHovered: boolean) => {
    setHoveredButtons((prev) => ({
      ...prev,
      [buttonId]: isHovered,
    }))
  }
  const handleGoBack = () => {
    navigate("/dashboard")
  }

  // Mock data for past events
  const pastEvents = [
    {
      id: "past1",
      title: "Villain Defense Workshop",
      date: "April 10, 2023",
      time: "2:00 PM - 5:00 PM",
      location: "Hero Training Center",
      category: "Training",
      image:
        "https://images.unsplash.com/photo-1569701813229-33284b643e3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "past2",
      title: "City Cleanup Initiative",
      date: "March 25, 2023",
      time: "9:00 AM - 12:00 PM",
      location: "Downtown Park",
      category: "Community",
      image:
        "https://images.unsplash.com/photo-1559548334-790c61c7244c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#F3F4F6",
      fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
      display: "flex",
      flexDirection: "column" as const,
    },
    backButtonHover: {
      backgroundColor: "#E5E7EB",
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
    backIcon: {
      width: "1.25rem",
      height: "1.25rem",
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem",
      flex: "1",
    },
    pageHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "2rem",
    },
    profileImage: {
      width: "5rem",
      height: "5rem",
      borderRadius: "50%",
      border: "3px solid #3B82F6",
      marginRight: "1.5rem",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: "1.75rem",
      fontWeight: "700",
      color: "#1F2937",
      marginBottom: "0.25rem",
      fontFamily: "'Bangers', cursive",
      letterSpacing: "0.05em",
    },
    userEmail: {
      fontSize: "1rem",
      color: "#6B7280",
    },
    tabs: {
      display: "flex",
      borderBottom: "2px solid #E5E7EB",
      marginBottom: "2rem",
    },
    tab: {
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
      fontWeight: "500",
      color: "#6B7280",
      cursor: "pointer",
      borderBottom: "2px solid transparent",
      marginBottom: "-2px",
      transition: "all 0.3s ease",
    },
    activeTab: {
      color: "#3B82F6",
      borderBottomColor: "#3B82F6",
      fontWeight: "600",
    },
    eventsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "1.5rem",
    },
    eventCard: {
      backgroundColor: "white",
      borderRadius: "0.75rem",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "2px solid #3B82F6",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    eventCardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
    },
    eventImage: {
      width: "100%",
      height: "160px",
      objectFit: "cover" as const,
    },
    eventContent: {
      padding: "1.25rem",
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
      fontSize: "1.25rem",
      fontWeight: "700",
      color: "#1F2937",
      marginBottom: "0.5rem",
      fontFamily: "'Bangers', cursive",
      letterSpacing: "0.05em",
    },
    eventDetails: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "0.5rem",
      marginBottom: "1rem",
    },
    eventDetail: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.875rem",
      color: "#6B7280",
    },
    eventIcon: {
      width: "1rem",
      height: "1rem",
      color: "#3B82F6",
    },
    eventActions: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "1rem",
      borderTop: "1px solid #E5E7EB",
      paddingTop: "1rem",
    },
    eventButton: {
      padding: "0.5rem 1rem",
      backgroundColor: "#3B82F6",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    eventButtonHover: {
      backgroundColor: "#2563EB",
    },
    cancelButton: {
      backgroundColor: "#EF4444",
    },
    cancelButtonHover: {
      backgroundColor: "#DC2626",
    },
    emptyState: {
      textAlign: "center" as const,
      padding: "3rem 0",
    },
    emptyStateIcon: {
      width: "4rem",
      height: "4rem",
      margin: "0 auto 1.5rem",
      color: "#9CA3AF",
    },
    emptyStateTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#4B5563",
      marginBottom: "0.5rem",
    },
    emptyStateText: {
      fontSize: "1rem",
      color: "#6B7280",
      marginBottom: "1.5rem",
    },
    emptyStateButton: {
      padding: "0.75rem 1.5rem",
      backgroundColor: "#3B82F6",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    emptyStateButtonHover: {
      backgroundColor: "#2563EB",
    },
  };

  if (!user) {
    return <div>Please log in to view your events</div>;
  }

  const renderEvents = () => {
    const events =
      activeTab === "attending" ? user.eventsAttending : pastEvents;

    if (events.length === 0) {
      return (
        <div style={styles.emptyState}>
          <svg
            style={styles.emptyStateIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V6H19V20ZM17 8H7V10H17V8ZM13 12H7V14H13V12ZM13 16H7V18H13V16Z"
              fill="currentColor"
            />
          </svg>
          <h3 style={styles.emptyStateTitle}>No events found</h3>
          <p style={styles.emptyStateText}>
            {activeTab === "attending"
              ? "You're not attending any upcoming events yet."
              : "You haven't attended any events in the past."}
          </p>
          <button
            style={{
              ...styles.emptyStateButton,
              ...(hoveredButtons["empty-browse"]
                ? styles.emptyStateButtonHover
                : {}),
            }}
            onMouseEnter={() => handleButtonHover("empty", "browse", true)}
            onMouseLeave={() => handleButtonHover("empty", "browse", false)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="currentColor"
              />
            </svg>
            Browse Events
          </button>
        </div>
      );
    }

    return (
      <div style={styles.eventsGrid}>
        {events.map((event, index) => (
          <div
            key={event.id}
            style={{
              ...styles.eventCard,
              ...(hoveredEvents.includes(Number.parseInt(event.id))
                ? styles.eventCardHover
                : {}),
            }}
            onMouseEnter={() => handleEventHover(event.id, true)}
            onMouseLeave={() => handleEventHover(event.id, false)}
          >
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              style={styles.eventImage}
            />
            <div style={styles.eventContent}>
              <span style={styles.eventCategory}>{event.category}</span>
              <h3 style={styles.eventTitle}>{event.title}</h3>
              <div style={styles.eventDetails}>
                <div style={styles.eventDetail}>
                  <svg
                    style={styles.eventIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8ZM9 14H7V12H9V14ZM13 14H11V12H13V14ZM17 14H15V12H17V14ZM9 18H7V16H9V18ZM13 18H11V16H13V18ZM17 18H15V16H17V18Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>{event.date}</span>
                </div>
                <div style={styles.eventDetail}>
                  <svg
                    style={styles.eventIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>{event.time}</span>
                </div>
                <div style={styles.eventDetail}>
                  <svg
                    style={styles.eventIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>{event.location}</span>
                </div>
              </div>
              <div style={styles.eventActions}>
                {activeTab === "attending" ? (
                  <>
                    <button
                      style={{
                        ...styles.eventButton,
                        ...(hoveredButtons[`${event.id}-details`]
                          ? styles.eventButtonHover
                          : {}),
                      }}
                      onMouseEnter={() =>
                        handleButtonHover(event.id, "details", true)
                      }
                      onMouseLeave={() =>
                        handleButtonHover(event.id, "details", false)
                      }
                    >
                      View Details
                    </button>
                    <button
                      style={{
                        ...styles.eventButton,
                        ...styles.cancelButton,
                        ...(hoveredButtons[`${event.id}-cancel`]
                          ? styles.cancelButtonHover
                          : {}),
                      }}
                      onMouseEnter={() =>
                        handleButtonHover(event.id, "cancel", true)
                      }
                      onMouseLeave={() =>
                        handleButtonHover(event.id, "cancel", false)
                      }
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    style={{
                      ...styles.eventButton,
                      ...(hoveredButtons[`${event.id}-details`]
                        ? styles.eventButtonHover
                        : {}),
                    }}
                    onMouseEnter={() =>
                      handleButtonHover(event.id, "details", true)
                    }
                    onMouseLeave={() =>
                      handleButtonHover(event.id, "details", false)
                    }
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

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
          onMouseEnter={() => handleReturnButtonHover("back", true)}
          onMouseLeave={() => handleReturnButtonHover("back", false)}
        >
          <svg
            style={styles.backIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 19L3 12L10 5L11.41 6.41L6.83 11H21V13H6.83L11.41 17.59L10 19Z"
              fill="currentColor"
            />
          </svg>
          Back
        </button>
        <div style={styles.pageHeader}>
          <img
            src={user.profilePicture || "/placeholder.svg"}
            alt={user.name}
            style={styles.profileImage}
          />
          <div style={styles.userInfo}>
            <h1 style={styles.userName}>{user.name}</h1>
            <p style={styles.userEmail}>{user.email}</p>
          </div>
        </div>

        <div style={styles.tabs}>
          <div
            style={{
              ...styles.tab,
              ...(activeTab === "attending" ? styles.activeTab : {}),
              ...(hoveredTab === "attending" && activeTab !== "attending"
                ? { color: "#4B5563" }
                : {}),
            }}
            onClick={() => setActiveTab("attending")}
            onMouseEnter={() => setHoveredTab("attending")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            Upcoming Events
          </div>
          <div
            style={{
              ...styles.tab,
              ...(activeTab === "past" ? styles.activeTab : {}),
              ...(hoveredTab === "past" && activeTab !== "past"
                ? { color: "#4B5563" }
                : {}),
            }}
            onClick={() => setActiveTab("past")}
            onMouseEnter={() => setHoveredTab("past")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            Past Events
          </div>
        </div>

        {renderEvents()}
      </div>
      <Footer />
    </div>
  );
};

export default UserEventsPage;
