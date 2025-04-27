// components/Footer.tsx
import React, { useState } from "react";
import { SocialIcon } from "./SocialIcon";
import { FooterLinks } from "./FooterLinks";
import logo from "../public/images/logo.png"; // Adjust if needed

const Footer: React.FC = () => {
  const [hoveredIcons, setHoveredIcons] = useState(Array(4).fill(false));

  const updateHoveredIcon = (index: number, isHovered: boolean) => {
    setHoveredIcons((prev) =>
      prev.map((state, i) => (i === index ? isHovered : state))
    );
  };

  const styles = {
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
    copyright: {
      marginTop: "3rem",
      textAlign: "center" as const,
      fontSize: "0.875rem",
      color: "rgba(255, 255, 255, 0.8)",
    },
  };

  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : true;

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        <div
          style={{
            ...styles.footerContent,
            ...(isMobile ? {} : styles.footerContentDesktop),
          }}
        >
          {/* Left Side */}
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
                      ...(hoveredIcons[index] ? styles.socialIconHover : {}),
                    }}
                    onMouseEnter={() => updateHoveredIcon(index, true)}
                    onMouseLeave={() => updateHoveredIcon(index, false)}
                  >
                    <SocialIcon name={platform} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Right Side Links */}
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

        {/* Copyright */}
        <div style={styles.copyright}>
          <p>
            &copy; {new Date().getFullYear()} Superhero Safety Network. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;