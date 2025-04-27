import logo from "../public/images/logo.png"
const SuperheroLogo = () => {
    const logoStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }
  
    return (
      <div style={logoStyle}>
        <img
          src={logo}
          alt="Superhero Safety Network Logo"
          style={{
            height: "50px",
            marginRight: "10px",
          }}
        />
        <h1
          style={{
            fontFamily: '"Bangers", cursive',
            fontSize: "1.8rem",
            color: "#0066cc",
            textShadow: "2px 2px 0px #ff3333",
            margin: 0,
          }}
        >
          Superhero Safety Network
        </h1>
      </div>
    )
  }
  
  export default SuperheroLogo
  