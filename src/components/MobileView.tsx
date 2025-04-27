const styles = {
    container: {
      position: "fixed" as const,
      inset: 0,
      backgroundColor: "white",
      zIndex: 50,
      overflow: "auto",
    },
    header: {
      borderBottom: "1px solid #e5e7eb",
    },
    headerContent: {
      display: "flex",
      alignItems: "center",
      padding: "1rem",
    },
    backIcon: {
      width: "1.25rem",
      height: "1.25rem",
      marginRight: "1rem",
    },
    title: {
      fontSize: "1.125rem",
      fontWeight: "500",
    },
    headerActions: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
    },
    actionIcon: {
      width: "1.25rem",
      height: "1.25rem",
      marginLeft: "1rem",
    },
    sidebar: {
      position: "fixed" as const,
      left: 0,
      top: "4rem",
      bottom: 0,
      width: "3rem",
      borderRight: "1px solid #e5e7eb",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      padding: "1rem 0",
    },
    addButton: {
      width: "2rem",
      height: "2rem",
      borderRadius: "9999px",
      border: "2px solid #e9d5ff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "2rem",
    },
    addButtonText: {
      fontSize: "1.25rem",
    },
    sidebarItem: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      marginBottom: "2rem",
    },
    sidebarIcon: {
      width: "2rem",
      height: "2rem",
      borderRadius: "9999px",
      border: "1px solid #e5e7eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "0.25rem",
    },
    sidebarDot: {
      width: "0.5rem",
      height: "0.5rem",
      borderRadius: "9999px",
      border: "1px solid #9ca3af",
    },
    sidebarLabel: {
      fontSize: "0.625rem",
      color: "#6b7280",
    },
    mainContent: {
      paddingLeft: "4rem",
      paddingRight: "1rem",
    },
    heroImage: {
      position: "relative" as const,
      height: "12rem",
      borderRadius: "0.5rem",
      overflow: "hidden",
      marginTop: "1rem",
      border: "2px solid #e5e7eb",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
    },
    imageTitle: {
      position: "absolute" as const,
      bottom: 0,
      left: 0,
      padding: "1rem",
    },
    imageTitleText: {
      color: "white",
      fontSize: "1.5rem",
      fontWeight: "700",
    },
    tabs: {
      display: "flex",
      marginTop: "1rem",
      marginBottom: "1.5rem",
    },
    tabItem: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
    },
    activeTab: {
      padding: "0.25rem 0.75rem",
      border: "1px solid #d8b4fe",
      color: "#7e22ce",
      borderRadius: "9999px",
      fontSize: "0.875rem",
    },
    inactiveTab: {
      padding: "0.25rem 0.75rem",
      fontSize: "0.875rem",
      border: "1px solid transparent",
    },
    eventsList: {
      marginBottom: "5rem",
    },
    eventCard: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.75rem",
      borderBottom: "1px solid #e5e7eb",
      paddingBottom: "1rem",
      marginBottom: "1rem",
    },
    eventImage: {
      border: "1px solid #e5e7eb",
      borderRadius: "0.5rem",
      overflow: "hidden",
    },
    eventImageElement: {
      width: "80px",
      height: "80px",
      objectFit: "cover" as const,
    },
    eventContent: {
      flex: 1,
    },
    eventTitle: {
      fontWeight: "500",
    },
    eventMeta: {
      fontSize: "0.75rem",
      color: "#6b7280",
    },
    eventDescription: {
      fontSize: "0.75rem",
      color: "#6b7280",
    },
    heartIcon: {
      width: "1.25rem",
      height: "1.25rem",
      color: "#6b7280",
    },
  }
  
  interface MobileEventCardProps {
    title: string
    category: string
    distance: string
    description: string
    imageSrc: string
  }
  
  function MobileEventCard({ title, category, distance, description, imageSrc }: MobileEventCardProps) {
    return (
      <div style={styles.eventCard}>
        <div style={styles.eventImage}>
          <img src={imageSrc || "/placeholder.svg"} alt={title} style={styles.eventImageElement} />
        </div>
        <div style={styles.eventContent}>
          <h3 style={styles.eventTitle}>{title}</h3>
          <p style={styles.eventMeta}>
            {category} • {distance}
          </p>
          <p style={styles.eventDescription}>{description}</p>
        </div>
        <svg style={styles.heartIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }
  
  export function MobileView() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <svg style={styles.backIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h1 style={styles.title}>Local Events</h1>
            <div style={styles.headerActions}>
              <svg style={styles.actionIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg style={styles.actionIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg style={styles.actionIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
  
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <button style={styles.addButton}>
            <span style={styles.addButtonText}>+</span>
          </button>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={styles.sidebarItem}>
              <div style={styles.sidebarIcon}>
                <span style={styles.sidebarDot}></span>
              </div>
              <span style={styles.sidebarLabel}>Label</span>
            </div>
          ))}
        </div>
  
        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Hero Image */}
          <div style={styles.heroImage}>
            <img src="https://via.placeholder.com/800x400" alt="Puget Sound" style={styles.image} />
            <div style={styles.imageTitle}>
              <h2 style={styles.imageTitleText}>Puget Sound</h2>
            </div>
          </div>
  
          {/* Tabs */}
          <div style={styles.tabs}>
            <div style={styles.tabItem}>
              <button style={styles.activeTab}>Community</button>
            </div>
            <div style={styles.tabItem}>
              <button style={styles.inactiveTab}>Label</button>
            </div>
          </div>
  
          {/* Event Cards */}
          <div style={styles.eventsList}>
            <MobileEventCard
              title="Bellevue Bridges"
              category="Parks"
              distance="1.2 miles away"
              description="Between Bellevue and Meydenbauer Park"
              imageSrc="https://via.placeholder.com/80"
            />
  
            <MobileEventCard
              title="Renton Repairs"
              category="Category"
              distance="5.7 miles away"
              description="Repairing our connection with Renton through gardening"
              imageSrc="https://via.placeholder.com/80"
            />
          </div>
        </div>
      </div>
    )
  }
  