"use client";

import React, { useState, useEffect } from "react";
import { MobileView } from "../components/MobileView";
import { SocialIcon } from "../components/SocialIcon";
import { FooterLinks } from "../components/FooterLinks";
import "../index.css";
import logo from "../public/images/logo.png";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../context/Firebase";

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
// Add a custom font for the superhero theme
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Bangers&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);


const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "100vh",
    fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
    background: "linear-gradient(to bottom, #f0f9ff, #ffffff)",
  },
  header: {
    display: "none" as const,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 1.5rem",
    borderBottom: "2px solid #3B82F6",
    background: "linear-gradient(to right, #60A5FA, #3B82F6)",
    color: "white",
  },
  headerDesktop: {
    display: "flex" as const,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  logoContainer: {
    width: "3rem",
    height: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "1rem",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  nav: {
    display: "flex",
  },
  navLink: {
    fontSize: "0.875rem",
    fontWeight: "700",
    marginRight: "1.5rem",
    textDecoration: "none",
    color: "white",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    position: "relative" as const,
    padding: "0.25rem 0",
  },
  navLinkHover: {
    color: "#FFEB3B",
  },
  navLinkAfter: {
    content: "''",
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "2px",
    background: "#FFEB3B",
    transform: "scaleX(0)",
    transformOrigin: "right",
    transition: "transform 0.3s ease",
  },
  navLinkAfterHover: {
    transform: "scaleX(1)",
    transformOrigin: "left",
  },
  headerRight: {
    display: "flex",
  },
  signInButton: {
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    border: "2px solid white",
    borderRadius: "0.25rem",
    marginRight: "0.75rem",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  signInButtonHover: {
    background: "rgba(255, 255, 255, 0.2)",
  },
  registerButton: {
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    border: "2px solid #FFEB3B",
    color: "#3B82F6",
    borderRadius: "0.25rem",
    background: "#FFEB3B",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  registerButtonHover: {
    background: "#FFF176",
  },
  heroSection: {
    borderBottom: "2px solid #3B82F6",
    padding: "3rem 1.5rem",
    background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
    position: "relative" as const,
    overflow: "hidden",
  },
  heroContent: {
    maxWidth: "56rem",
    margin: "0 auto",
    textAlign: "center" as const,
    position: "relative" as const,
    zIndex: 2,
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "white",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    textShadow: "2px 2px 0 #FF3B30, 4px 4px 0 rgba(0,0,0,0.2)",
    fontFamily: "'Bangers', cursive",
  },
  heroSubtitle: {
    color: "white",
    fontSize: "1.25rem",
    fontWeight: "500",
    textShadow: "1px 1px 0 rgba(0,0,0,0.2)",
  },
  heroBg: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.1,
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/cubes.png')",
  },
  eventsSection: {
    padding: "3rem 1.5rem",
  },
  eventsContainer: {
    maxWidth: "72rem",
    margin: "0 auto",
  },
  featuredImageContainer: {
    borderRadius: "0.75rem",
    overflow: "hidden",
    marginBottom: "1.5rem",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "2px solid #3B82F6",
  },
  featuredImageWrapper: {
    position: "relative" as const,
  },
  featuredImage: {
    width: "100%",
    height: "auto",
  },
  featuredImageTitle: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    width: "100%",
    padding: "1.5rem",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
  },
  featuredImageText: {
    color: "white",
    fontSize: "2.25rem",
    fontWeight: "700",
    textTransform: "uppercase" as const,
    textShadow: "2px 2px 0 #FF3B30",
    fontFamily: "'Bangers', cursive",
  },
  tabsContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  tabsWrapper: {
    display: "inline-flex",
    borderRadius: "9999px",
    border: "2px solid #3B82F6",
    overflow: "hidden",
  },
  activeTab: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#3B82F6",
    color: "white",
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
  },
  inactiveTab: {
    padding: "0.75rem 1.5rem",
    color: "#3B82F6",
    background: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  checkIcon: {
    width: "1.25rem",
    height: "1.25rem",
    marginRight: "0.5rem",
  },
  eventsListContainer: {
    marginTop: "1.5rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  eventCard: {
    border: "2px solid #3B82F6",
    borderRadius: "0.75rem",
    overflow: "hidden",
    background: "white",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  eventCardHover: {
    transform: "translateY(-5px)",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  eventImageContainer: {
    position: "relative" as const,
    height: "160px",
  },
  eventImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  eventImageOverlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)",
  },
  eventCategory: {
    position: "absolute" as const,
    top: "10px",
    right: "10px",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    backgroundColor: "#FF3B30",
    color: "white",
    fontWeight: "bold",
    fontSize: "0.75rem",
    textTransform: "uppercase" as const,
  },
  eventContent: {
    padding: "1.25rem",
  },
  eventTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "#3B82F6",
    fontFamily: "'Bangers', cursive",
    letterSpacing: "0.05em",
  },
  eventMeta: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.875rem",
    color: "#6B7280",
    marginBottom: "0.75rem",
  },
  eventIcon: {
    width: "1rem",
    height: "1rem",
    marginRight: "0.25rem",
    color: "#3B82F6",
  },
  eventDescription: {
    fontSize: "0.875rem",
    color: "#4B5563",
    lineHeight: "1.5",
  },
  eventFooter: {
    padding: "0.75rem 1.25rem",
    borderTop: "1px solid #E5E7EB",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#F9FAFB",
  },
  eventButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#FF3B30",
    color: "white",
    border: "none",
    borderRadius: "0.25rem",
    fontWeight: "bold",
    fontSize: "0.75rem",
    cursor: "pointer",
    textTransform: "uppercase" as const,
  },
  eventAttendees: {
    fontSize: "0.75rem",
    color: "#6B7280",
    display: "flex",
    alignItems: "center",
  },
  footer: {
    padding: "3rem 1.5rem",
    marginTop: "auto",
    borderTop: "2px solid #3B82F6",
    background: "linear-gradient(to right, #60A5FA, #3B82F6)",
    color: "white",
  },
  footerContainer: {
    maxWidth: "72rem",
    margin: "0 auto",
  },
  footerContent: {
    display: "flex",
    flexDirection: "column" as const,
  },
  footerContentDesktop: {
    flexDirection: "row" as const,
    justifyContent: "space-between",
  },
  footerLeft: {
    marginBottom: "2rem",
  },
  footerLogo: {
    width: "3rem",
    height: "3rem",
    marginBottom: "1rem",
  },
  footerLogoImage: {
    width: "100%",
    height: "100%",
  },
  footerTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "white",
    fontFamily: "'Bangers', cursive",
    letterSpacing: "0.05em",
    textShadow: "1px 1px 0 #FF3B30",
  },
  footerTagline: {
    fontSize: "0.875rem",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: "1rem",
  },
  socialIcons: {
    display: "flex",
    marginTop: "1rem",
  },
  socialIcon: {
    marginRight: "1rem",
    backgroundColor: "white",
    borderRadius: "9999px",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#3B82F6",
    transition: "transform 0.3s ease",
  },
  socialIconHover: {
    transform: "translateY(-3px)",
  },
  footerLinks: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "2rem",
  },
  footerLinksDesktop: {
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "4rem",
  },
  footerLinkTitle: {
    fontSize: "1.125rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "white",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  footerLinkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  footerLinkItem: {
    marginBottom: "0.5rem",
  },
  footerLink: {
    color: "rgba(255, 255, 255, 0.8)",
    textDecoration: "none",
    fontSize: "0.875rem",
    transition: "color 0.3s ease",
  },
  footerLinkHover: {
    color: "#FFEB3B",
  },
  copyright: {
    marginTop: "3rem",
    textAlign: "center" as const,
    fontSize: "0.875rem",
    color: "rgba(255, 255, 255, 0.8)",
  },
};

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMap, setShowMap] = useState(false);
   const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [hoveredStates, setHoveredStates] = useState({
    navLinks: Array(6).fill(false),
    signIn: false,
    register: false,
    socialIcons: Array(4).fill(false),
    footerLinks: Array(15).fill(false),
    eventCards: Array(allEvents.length).fill(false),
  });

  // Update isMobile state on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();
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
  // Add Bangers font for superhero styling
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Bangers&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Simulate media query with React
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper function to update hovered states
  const updateHoveredState = (
    category: keyof typeof hoveredStates,
    index: number,
    isHovered: boolean
  ) => {
    setHoveredStates((prev) => {
      const categoryStates = prev[category];

      // Only allow mapping if it's actually an array
      if (Array.isArray(categoryStates)) {
        return {
          ...prev,
          [category]: categoryStates.map((state, i) =>
            i === index ? isHovered : state
          ),
        };
      }

      // If it's not an array (boolean like signIn/register), just return previous state unchanged
      return prev;
    });
  };

  const handleSignIn = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div style={styles.container}>
      {/* Desktop Header - Hidden on mobile */}
      <header
        style={{
          ...styles.header,
          ...(isMobile ? {} : styles.headerDesktop),
        }}
      >
        <div style={styles.headerLeft}>
          <div style={styles.logoContainer}>
            <img
              src={logo}
              alt="Superhero Safety Network Logo"
              style={styles.logoImage}
            />
          </div>
        </div>
        <div style={styles.headerRight}>
          <button
            style={{
              ...styles.signInButton,
              ...(hoveredStates.signIn ? styles.signInButtonHover : {}),
            }}
            onMouseEnter={() =>
              setHoveredStates((prev) => ({ ...prev, signIn: true }))
            }
            onMouseLeave={() =>
              setHoveredStates((prev) => ({ ...prev, signIn: false }))
            }
            onClick={() => handleSignIn()}
          >
            Sign in
          </button>
          <button
            style={{
              ...styles.registerButton,
              ...(hoveredStates.register ? styles.registerButtonHover : {}),
            }}
            onMouseEnter={() =>
              setHoveredStates((prev) => ({ ...prev, register: true }))
            }
            onMouseLeave={() =>
              setHoveredStates((prev) => ({ ...prev, register: false }))
            }
            onClick={() => handleSignUp()}
          >
            Join Heroes
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroBg}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Superhero Safety Network</h1>
          <p style={styles.heroSubtitle}>Uniting Heroes for a Safer Tomorrow</p>
        </div>
      </section>

      {/* Events Section */}
      <section style={styles.eventsSection}>
        <div style={styles.eventsContainer}>
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

          <div style={styles.eventsListContainer}>
            {allEvents.map((event, index) => (
              <div
                key={event.id}
                style={{
                  ...styles.eventCard,
                  ...(hoveredStates.eventCards[index]
                    ? styles.eventCardHover
                    : {}),
                }}
                onMouseEnter={() =>
                  updateHoveredState("eventCards", index, true)
                }
                onMouseLeave={() =>
                  updateHoveredState("eventCards", index, false)
                }
              >
                <div style={styles.eventImageContainer}>
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    style={styles.eventImage}
                  />
                  <div style={styles.eventImageOverlay}></div>
                  <div style={styles.eventCategory}>{event.category}</div>
                </div>
                <div style={styles.eventContent}>
                  <h3 style={styles.eventTitle}>{event.title}</h3>
                  <div style={styles.eventMeta}>
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
                    <h3 style={styles.eventContent}>{event.location}</h3>
                  </div>
                  <p style={styles.eventDescription}>{event.description}</p>
                </div>
                <div style={styles.eventFooter}>
                  <button style={styles.eventButton} onClick={() => {handleSignIn()}}>Join Mission</button>
                  <div style={styles.eventAttendees}>
                    <svg
                      style={{ ...styles.eventIcon, marginRight: "0.25rem" }}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 17V19H2V17C2 17 2 13 9 13C16 13 16 17 16 17ZM12.5 7.5C12.5 9.43 10.93 11 9 11C7.07 11 5.5 9.43 5.5 7.5C5.5 5.57 7.07 4 9 4C10.93 4 12.5 5.57 12.5 7.5ZM17.5 4.5C19.16 4.5 20.5 5.84 20.5 7.5C20.5 9.16 19.16 10.5 17.5 10.5C16.94 10.5 16.42 10.34 15.97 10.07C16.64 9.26 17 8.25 17 7.14C17 6.09 16.68 5.13 16.08 4.34C16.47 4.39 16.97 4.5 17.5 4.5ZM22 17V19H18V17C18 16.65 17.93 16.31 17.82 16C18.4 16.04 18.91 16.21 19.34 16.5C20.16 17 20.5 17.5 20.5 17.5V17H22Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>{event.attendees?.length} heroes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div
            style={{
              ...styles.footerContent,
              ...(isMobile ? {} : styles.footerContentDesktop),
            }}
          >
            <div style={styles.footerLeft}>
              <div style={styles.footerLogo}>
                <img
                  src={logo}
                  alt="Superhero Safety Network Logo"
                  style={styles.footerLogoImage}
                />
              </div>
              <h3 style={styles.footerTitle}>Superhero Safety Network</h3>
              <p style={styles.footerTagline}>
                Uniting Heroes for a Safer Tomorrow
              </p>
              <div style={styles.socialIcons}>
                {["Twitter", "Instagram", "Facebook", "LinkedIn"].map(
                  (platform, index) => (
                    <a
                      key={platform}
                      href="#"
                      style={{
                        ...styles.socialIcon,
                        ...(hoveredStates.socialIcons[index]
                          ? styles.socialIconHover
                          : {}),
                      }}
                      onMouseEnter={() =>
                        updateHoveredState("socialIcons", index, true)
                      }
                      onMouseLeave={() =>
                        updateHoveredState("socialIcons", index, false)
                      }
                    >
                      <SocialIcon name={platform} />
                    </a>
                  )
                )}
              </div>
            </div>

            <div
              style={{
                ...styles.footerLinks,
                ...(isMobile ? {} : styles.footerLinksDesktop),
              }}
            >
              <div>
                <h4 style={styles.footerLinkTitle}>Hero Resources</h4>
                <ul style={styles.footerLinkList}>
                  <FooterLinks
                    title=""
                    links={[
                      { name: "Training Programs", href: "#" },
                      { name: "Equipment Guide", href: "#" },
                      { name: "Power Control", href: "#" },
                      { name: "Secret Identity", href: "#" },
                      { name: "Hero Registry", href: "#" },
                    ]}
                  />
                </ul>
              </div>

              <div>
                <h4 style={styles.footerLinkTitle}>Mission Types</h4>
                <ul style={styles.footerLinkList}>
                  <FooterLinks
                    title=""
                    links={[
                      { name: "Rescue Operations", href: "#" },
                      { name: "Villain Containment", href: "#" },
                      { name: "Disaster Response", href: "#" },
                      { name: "Community Outreach", href: "#" },
                      { name: "Global Threats", href: "#" },
                    ]}
                  />
                </ul>
              </div>

              <div>
                <h4 style={styles.footerLinkTitle}>Support</h4>
                <ul style={styles.footerLinkList}>
                  <FooterLinks
                    title=""
                    links={[
                      { name: "Hero Hotline", href: "#" },
                      { name: "Medical Services", href: "#" },
                      { name: "Legal Protection", href: "#" },
                      { name: "Counseling", href: "#" },
                      { name: "Report Villains", href: "#" },
                    ]}
                  />
                </ul>
              </div>
            </div>
          </div>

          <div style={styles.copyright}>
            <p>
              &copy; {new Date().getFullYear()} Superhero Safety Network. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile View - Only visible on small screens */}
      {isMobile && <MobileView />}
    </div>
  );
};

export default App;
