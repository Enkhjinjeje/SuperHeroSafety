"use client"

import React, { useState } from "react"
import { EventCard } from "./components/EventCard"
import { MobileView } from "./components/MobileView"
import { SocialIcon } from "./components/SocialIcon"
import { FooterLinks } from "./components/FooterLinks"

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "100vh",
  },
  header: {
    display: "none",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 1.5rem",
    borderBottom: "1px solid #e5e7eb",
  },
  headerDesktop: {
    display: "flex",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  logoContainer: {
    width: "2rem",
    height: "2rem",
    border: "2px solid #9ca3af",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.375rem",
    marginRight: "2rem",
  },
  logoText: {
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
  },
  navLink: {
    fontSize: "0.875rem",
    fontWeight: "500",
    marginRight: "1.5rem",
    textDecoration: "none",
    color: "inherit",
  },
  headerRight: {
    display: "flex",
  },
  signInButton: {
    padding: "0.25rem 0.75rem",
    fontSize: "0.875rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.25rem",
    marginRight: "0.5rem",
    background: "none",
    cursor: "pointer",
  },
  registerButton: {
    padding: "0.25rem 0.75rem",
    fontSize: "0.875rem",
    border: "2px solid #1f2937",
    color: "#1f2937",
    borderRadius: "0.25rem",
    background: "none",
    cursor: "pointer",
  },
  heroSection: {
    borderBottom: "1px solid #e5e7eb",
    padding: "4rem 1.5rem 8rem 1.5rem",
  },
  heroContent: {
    maxWidth: "56rem",
    margin: "0 auto",
    textAlign: "center" as const,
  },
  heroTitle: {
    fontSize: "2.25rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
  },
  heroSubtitle: {
    color: "#6b7280",
    fontSize: "1.125rem",
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
    bottom: "1.5rem",
    left: "1.5rem",
    color: "white",
    fontSize: "2.25rem",
    fontWeight: "700",
  },
  tabsContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  tabsWrapper: {
    display: "inline-flex",
    borderRadius: "9999px",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
  },
  activeTab: {
    padding: "0.5rem 1.5rem",
    backgroundColor: "#f3e8ff",
    color: "#7e22ce",
    display: "flex",
    alignItems: "center",
  },
  inactiveTab: {
    padding: "0.5rem 1.5rem",
  },
  checkIcon: {
    width: "1.25rem",
    height: "1.25rem",
    marginRight: "0.5rem",
  },
  eventsListContainer: {
    marginTop: "1.5rem",
  },
  footer: {
    padding: "3rem 1.5rem",
    marginTop: "auto",
    borderTop: "1px solid #e5e7eb",
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
    width: "2rem",
    height: "2rem",
    border: "2px solid #9ca3af",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.375rem",
    marginBottom: "1rem",
  },
  socialIcons: {
    display: "flex",
    marginTop: "1rem",
  },
  socialIcon: {
    marginRight: "1rem",
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
  // Media queries will be handled with JavaScript conditionals
}

export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Simulate media query with React
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isMobile = windowWidth < 768

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
            <span style={styles.logoText}>S</span>
          </div>
          <nav style={styles.nav}>
            <a href="#" style={styles.navLink}>
              Local Events
            </a>
            <a href="#" style={styles.navLink}>
              Maps
            </a>
            <a href="#" style={styles.navLink}>
              Community
            </a>
            <a href="#" style={styles.navLink}>
              Impact
            </a>
            <a href="#" style={styles.navLink}>
              Contact
            </a>
            <a href="#" style={styles.navLink}>
              Link
            </a>
          </nav>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.signInButton}>Sign in</button>
          <button style={styles.registerButton}>Register</button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Superhero Safety Network</h1>
          <p style={styles.heroSubtitle}>Connecting Communities for Change</p>
        </div>
      </section>

      {/* Events Section */}
      <section style={styles.eventsSection}>
        <div style={styles.eventsContainer}>
          <div style={styles.featuredImageContainer}>
            <div style={styles.featuredImageWrapper}>
              <img
                src="https://via.placeholder.com/800x400"
                alt="Puget Sound with Seattle skyline and Mt. Rainier"
                style={styles.featuredImage}
              />
              <div style={styles.featuredImageTitle}>
                <h2>Puget Sound</h2>
              </div>
            </div>
          </div>

          <div style={styles.tabsContainer}>
            <div style={styles.tabsWrapper}>
              <button style={styles.activeTab}>
                <svg style={styles.checkIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Community
              </button>
              <button style={styles.inactiveTab}>Label</button>
            </div>
          </div>

          <div style={styles.eventsListContainer}>
            <EventCard
              title="Bellevue Bridges"
              category="Parks"
              distance="1.2 miles away"
              description="Cleaning up Bellevue Downtown Park"
              imageSrc="https://via.placeholder.com/80"
              imageAlt="Bellevue Bridges"
            />

            <EventCard
              title="Renton Repairs"
              category="Category"
              distance="5.7 miles away"
              description="Repairing our connection with Renton through gardening"
              imageSrc="https://via.placeholder.com/80"
              imageAlt="Renton Repairs"
            />
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
                <span style={styles.logoText}>S</span>
              </div>
              <div style={styles.socialIcons}>
                <SocialIcon name="Twitter" />
                <SocialIcon name="Instagram" />
                <SocialIcon name="Facebook" />
                <SocialIcon name="LinkedIn" />
              </div>
            </div>

            <div
              style={{
                ...styles.footerLinks,
                ...(isMobile ? {} : styles.footerLinksDesktop),
              }}
            >
              <FooterLinks
                title="Use cases"
                links={[
                  { name: "UI design", href: "#" },
                  { name: "UX design", href: "#" },
                ]}
              />

              <FooterLinks
                title="Explore"
                links={[
                  { name: "Design", href: "#" },
                  { name: "Prototyping", href: "#" },
                  { name: "Wireframing", href: "#" },
                  { name: "Diagramming", href: "#" },
                  { name: "Brainstorming", href: "#" },
                  { name: "Online whiteboard", href: "#" },
                  { name: "Team collaboration", href: "#" },
                  { name: "Figma", href: "#" },
                ]}
              />

              <FooterLinks
                title="Resources"
                links={[
                  { name: "Blog", href: "#" },
                  { name: "Best practices", href: "#" },
                  { name: "Colors", href: "#" },
                  { name: "Color wheel", href: "#" },
                  { name: "Support", href: "#" },
                  { name: "Developers", href: "#" },
                  { name: "Resource library", href: "#" },
                ]}
              />
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile View - Only visible on small screens */}
      {isMobile && <MobileView />}
    </div>
  )
}
