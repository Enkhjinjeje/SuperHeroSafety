const styles = {
    container: {
      marginBottom: "1rem",
    },
    title: {
      fontWeight: "500",
      marginBottom: "1rem",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    listItem: {
      marginBottom: "0.5rem",
    },
    link: {
      fontSize: "0.875rem",
      color: "#6b7280",
      textDecoration: "none",
    },
  }
  
  interface FooterLinksProps {
    title: string
    links: { name: string; href: string }[]
  }
  
  export function FooterLinks({ title, links }: FooterLinksProps) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>{title}</h3>
        <ul style={styles.list}>
          {links.map((link) => (
            <li key={link.name} style={styles.listItem}>
              <a href={link.href} style={styles.link}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  