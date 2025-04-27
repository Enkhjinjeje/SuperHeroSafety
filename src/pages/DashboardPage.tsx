import type React from "react";
import { useEffect, useState } from "react";
import { useAuth, db } from "../context/Firebase";
import UserProfileHeader from "../components/UserProfileHeader";
import EventSearch from "../components/EventSearch";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
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
}

const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
  
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
  
    const [hoveredEvents, setHoveredEvents] = useState<string[]>([]);
    const [hoveredButtons, setHoveredButtons] = useState<{ [key: string]: boolean }>({});
    const [hoveredCategories, setHoveredCategories] = useState<string | null>(null);
  
    // Fetch events from Firebase
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const eventsSnapshot = await getDocs(collection(db, "events"));
          const eventsData = eventsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Event[];
          setAllEvents(eventsData);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
  
      fetchEvents();
    }, []);
  
    // Filter events by category and search query
    const filteredEvents = allEvents
      .filter((event) => !activeCategory || event.category === activeCategory)
      .filter((event) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          event.title.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query)
        );
      });
  
    const categories = Array.from(new Set(allEvents.map((event) => event.category)));
  
    const handleEventHover = (eventId: string, isHovered: boolean) => {
      setHoveredEvents((prev) => {
        if (isHovered) {
          return [...prev, eventId];
        } else {
          return prev.filter((id) => id !== eventId);
        }
      });
    };
  
    const handleButtonHover = (buttonId: string, isHovered: boolean) => {
      setHoveredButtons((prev) => ({
        ...prev,
        [buttonId]: isHovered,
      }));
    };
  
    const handleViewMyEvents = () => {
      navigate("/user-events");
    };
  
    const handleViewEventDetails = (eventId: string) => {
      navigate(`/events/${eventId}`);
    };
  
    const handleCreateEvent = () => {
      navigate("/create-event");
    };
  
    const handleSearch = (query: string) => {
      setSearchQuery(query);
    };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#F3F4F6",
      fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
      display: "flex",
      flexDirection: "column" as const,
    },
    featuredImageContainer: {
        borderRadius: "0.75rem",
        overflow: "hidden",
        marginBottom: "1.5rem",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        border: "2px solid #3B82F6",
      },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem",
      flex: "1",
    },
    welcomeSection: {
      backgroundColor: "white",
      borderRadius: "1rem",
      padding: "2rem",
      marginBottom: "2rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "2px solid #3B82F6",
      background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
    },
    welcomeHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
    },
    welcomeTitle: {
      fontSize: "1.75rem",
      fontWeight: "700",
      color: "#1F2937",
      fontFamily: "'Bangers', cursive",
      letterSpacing: "0.05em",
      textShadow: "1px 1px 0 #FF3B30",
    },
    welcomeText: {
      fontSize: "1rem",
      color: "#4B5563",
      marginBottom: "1.5rem",
    },
    welcomeActions: {
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap" as const,
    },
    actionButton: {
      padding: "0.75rem 1.5rem",
      backgroundColor: "#3B82F6",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    actionButtonHover: {
      backgroundColor: "#2563EB",
    },
    secondaryButton: {
      backgroundColor: "white",
      color: "#3B82F6",
      border: "2px solid #3B82F6",
    },
    secondaryButtonHover: {
      backgroundColor: "#EFF6FF",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1F2937",
      marginBottom: "1.5rem",
      fontFamily: "'Bangers', cursive",
      letterSpacing: "0.05em",
    },
    filterSection: {
      display: "flex",
      gap: "0.75rem",
      marginBottom: "2rem",
      flexWrap: "wrap" as const,
    },
    filterButton: {
      padding: "0.5rem 1rem",
      backgroundColor: "white",
      color: "#4B5563",
      border: "2px solid #E5E7EB",
      borderRadius: "9999px",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    filterButtonHover: {
      borderColor: "#3B82F6",
      color: "#3B82F6",
    },
    filterButtonActive: {
      backgroundColor: "#3B82F6",
      color: "white",
      borderColor: "#3B82F6",
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
    eventDescription: {
      fontSize: "0.875rem",
      color: "#4B5563",
      marginBottom: "1rem",
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
    noResultsContainer: {
      textAlign: "center" as const,
      padding: "3rem 0",
    },
    noResultsIcon: {
      width: "4rem",
      height: "4rem",
      margin: "0 auto 1.5rem",
      color: "#9CA3AF",
    },
    noResultsTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#4B5563",
      marginBottom: "0.5rem",
    },
    noResultsText: {
      fontSize: "1rem",
      color: "#6B7280",
      marginBottom: "1.5rem",
    },
  }

  if (!user) {
    return <div>Please log in to view the dashboard</div>
  }

  return (
    <div style={styles.container}>
      <UserProfileHeader />
      <div style={styles.content}>
        <div style={styles.welcomeSection}>
          <div style={styles.welcomeHeader}>
            <h1 style={styles.welcomeTitle}>Welcome back, {user.name}!</h1>
          </div>
          <p style={styles.welcomeText}>
            Discover upcoming superhero events, join community initiatives, and connect with fellow heroes.
          </p>
          <div style={styles.welcomeActions}>
            <button
              style={{
                ...styles.actionButton,
                ...(hoveredButtons["create-event"] ? styles.actionButtonHover : {}),
              }}
              onMouseEnter={() => handleButtonHover("create-event", true)}
              onMouseLeave={() => handleButtonHover("create-event", false)}
              onClick={handleCreateEvent}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor" />
              </svg>
              Create New Event
            </button>
            <button
              style={{
                ...styles.actionButton,
                ...styles.secondaryButton,
                ...(hoveredButtons["my-events"] ? styles.secondaryButtonHover : {}),
              }}
              onMouseEnter={() => handleButtonHover("my-events", true)}
              onMouseLeave={() => handleButtonHover("my-events", false)}
              onClick={handleViewMyEvents}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V6H19V20ZM17 8H7V10H17V8ZM13 12H7V14H13V12ZM13 16H7V18H13V16Z"
                  fill="currentColor"
                />
              </svg>
              My Events
            </button>
          </div>
        </div>

        <div style={styles.featuredImageContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.5330699350043!2d-122.20629592320712!3d47.615768287343855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906c86779db517%3A0xda7188c739364d86!2sBellevue%20Square!5e0!3m2!1sen!2sus!4v1745722710895!5m2!1sen!2sus"
              width="1300px"
              height="500px"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        <h2 style={styles.sectionTitle}>Upcoming Events</h2>

        <EventSearch onSearch={handleSearch} />

        <div style={styles.filterSection}>
          <button
            style={{
              ...styles.filterButton,
              ...(activeCategory === null ? styles.filterButtonActive : {}),
              ...(hoveredCategories === "all" && activeCategory !== null ? styles.filterButtonHover : {}),
            }}
            onClick={() => setActiveCategory(null)}
            onMouseEnter={() => setHoveredCategories("all")}
            onMouseLeave={() => setHoveredCategories(null)}
          >
            All Events
          </button>
          {categories.map((category) => (
            <button
              key={category}
              style={{
                ...styles.filterButton,
                ...(activeCategory === category ? styles.filterButtonActive : {}),
                ...(hoveredCategories === category && activeCategory !== category ? styles.filterButtonHover : {}),
              }}
              onClick={() => setActiveCategory(category)}
              onMouseEnter={() => setHoveredCategories(category)}
              onMouseLeave={() => setHoveredCategories(null)}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredEvents.length > 0 ? (
          <div style={styles.eventsGrid}>
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                style={{
                  ...styles.eventCard,
                  ...(hoveredEvents.includes(event.id) ? styles.eventCardHover : {}),
                }}
                onMouseEnter={() => handleEventHover(event.id, true)}
                onMouseLeave={() => handleEventHover(event.id, false)}
              >
                <img src={event.image || "/placeholder.svg"} alt={event.title} style={styles.eventImage} />
                <div style={styles.eventContent}>
                  <span style={styles.eventCategory}>{event.category}</span>
                  <h3 style={styles.eventTitle}>{event.title}</h3>
                  <div style={styles.eventDetails}>
                    <div style={styles.eventDetail}>
                      <svg style={styles.eventIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M19 4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8ZM9 14H7V12H9V14ZM13 14H11V12H13V14ZM17 14H15V12H17V14ZM9 18H7V16H9V18ZM13 18H11V16H13V18ZM17 18H15V16H17V18Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div style={styles.eventDetail}>
                      <svg style={styles.eventIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div style={styles.eventDetail}>
                      <svg style={styles.eventIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p style={styles.eventDescription}>{event.description}</p>
                  <div style={styles.eventActions}>
                    <button
                      style={{
                        ...styles.eventButton,
                        ...(hoveredButtons[`details-${event.id}`] ? styles.eventButtonHover : {}),
                      }}
                      onMouseEnter={() => handleButtonHover(`details-${event.id}`, true)}
                      onMouseLeave={() => handleButtonHover(`details-${event.id}`, false)}
                      onClick={() => handleViewEventDetails(event.id)}
                    >
                      View Details
                    </button>
                    <button
                      style={{
                        ...styles.eventButton,
                        ...(hoveredButtons[`join-${event.id}`] ? styles.eventButtonHover : {}),
                      }}
                      onMouseEnter={() => handleButtonHover(`join-${event.id}`, true)}
                      onMouseLeave={() => handleButtonHover(`join-${event.id}`, false)}
                    >
                      Join Event
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.noResultsContainer}>
            <svg style={styles.noResultsIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="currentColor"
              />
            </svg>
            <h3 style={styles.noResultsTitle}>No Events Found</h3>
            <p style={styles.noResultsText}>
              {searchQuery
                ? `No events match your search for "${searchQuery}"`
                : "No events found for the selected category"}
            </p>
            <button
              style={{
                ...styles.actionButton,
                ...(hoveredButtons["clear-search"] ? styles.actionButtonHover : {}),
              }}
              onMouseEnter={() => handleButtonHover("clear-search", true)}
              onMouseLeave={() => handleButtonHover("clear-search", false)}
              onClick={() => {
                setSearchQuery("")
                setActiveCategory(null)
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default DashboardPage
