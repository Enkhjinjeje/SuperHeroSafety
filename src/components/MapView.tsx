"use client"

import { useState } from "react"

// Mock event locations for the map
const eventLocations = [
  { id: 1, name: "Hero Training", lat: 47.6062, lng: -122.3321, type: "Training" },
  { id: 2, name: "Villain Alert", lat: 47.6502, lng: -122.35, type: "Alert" },
  { id: 3, name: "Community Patrol", lat: 47.5812, lng: -122.3534, type: "Community" },
  { id: 4, name: "Rescue Mission", lat: 47.6092, lng: -122.315, type: "Rescue" },
  { id: 5, name: "Superhero Meetup", lat: 47.674, lng: -122.1215, type: "Social" },
]

const MapView = () => {
    type Location = {
        id: number;
        name: string;
        lat: number;
        lng: number;
        type: string;
      };
      
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "12px",
    overflow: "hidden",
    position: "relative" as const,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  }

  const mapStyle = {
    width: "100%",
    height: "100%",
    backgroundImage:
      'url("https://maps.googleapis.com/maps/api/staticmap?center=47.6062,-122.3321&zoom=11&size=600x400&maptype=roadmap&style=feature:all|element:labels|visibility:on&style=feature:all|element:labels.text.fill|color:0x000000&style=feature:all|element:labels.text.stroke|color:0xffffff&style=feature:all|element:labels.icon|visibility:off&style=feature:administrative|element:geometry.fill|color:0x000000&style=feature:administrative|element:geometry.stroke|color:0x000000&style=feature:landscape|element:geometry|color:0xf0f0f0&style=feature:poi|element:geometry|color:0xe0e0e0&style=feature:poi.park|element:geometry|color:0xe0e0e0&style=feature:road|element:geometry|color:0xffffff&style=feature:road.highway|element:geometry.fill|color:0x0066cc&style=feature:road.highway|element:geometry.stroke|color:0x0066cc&style=feature:road.arterial|element:geometry|color:0xffffff&style=feature:road.local|element:geometry|color:0xffffff&style=feature:transit|element:geometry|color:0xe0e0e0&style=feature:water|element:geometry|color:0x0066cc&key=AIzaSyBOSAzsNMu8SkF_mloB5miG-jznOrF4tKs7")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative" as const,
  }

  const markerStyle = (type: string) => ({
    position: "absolute"  as const,
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: getMarkerColor(type),
    border: "2px solid white",
    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
    zIndex: 2,
  })

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "Training":
        return "#ff3333" // Red
      case "Alert":
        return "#ff9900" // Orange
      case "Community":
        return "#33cc33" // Green
      case "Rescue":
        return "#9900cc" // Purple
      case "Social":
        return "#0099ff" // Blue
      default:
        return "#666666" // Gray
    }
  }

  const infoBoxStyle = {
    position: "absolute" as const,
    bottom: "20px",
    left: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "10px 15px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    zIndex: 3,
    maxWidth: "250px",
    fontFamily: "Arial, sans-serif",
  }

  const legendStyle = {
    position: "absolute" as const,
    top: "20px",
    right: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    zIndex: 3,
  }

  const legendItemStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
    fontSize: "12px",
  }

  const legendColorStyle = (color: string) => ({
    width: "12px",
    height: "12px",
    backgroundColor: color,
    borderRadius: "50%",
    marginRight: "5px",
  })

  // Calculate position on the map based on lat/lng
  const getPosition = (lat: number, lng: number) => {
    // This is a simplified calculation for demonstration
    // In a real app, you would use proper map projection calculations
    const x = (lng + 122.3321) * 300 + 50 // Simplified x position
    const y = (47.6062 - lat) * 300 + 200 // Simplified y position
    return { left: `${x}px`, top: `${y}px` }
  }

  return (
    <div style={mapContainerStyle}>
      <div style={mapStyle}>
        {eventLocations.map((location) => (
          <div
            key={location.id}
            style={{
              ...markerStyle(location.type),
              ...getPosition(location.lat, location.lng),
            }}
            onClick={() => setSelectedLocation(location)}
            title={location.name}
          />
        ))}

        {selectedLocation && (
          <div style={infoBoxStyle}>
            <h3 style={{ margin: "0 0 5px 0", color: getMarkerColor(selectedLocation.type) }}>
              {selectedLocation.name}
            </h3>
            <p style={{ margin: "0", fontSize: "14px" }}>Type: {selectedLocation.type}</p>
            <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#666" }}>
              Location: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
            </p>
          </div>
        )}

        <div style={legendStyle}>
          <div style={legendItemStyle}>
            <div style={legendColorStyle("#ff3333")}></div>
            <span>Training</span>
          </div>
          <div style={legendItemStyle}>
            <div style={legendColorStyle("#ff9900")}></div>
            <span>Alert</span>
          </div>
          <div style={legendItemStyle}>
            <div style={legendColorStyle("#33cc33")}></div>
            <span>Community</span>
          </div>
          <div style={legendItemStyle}>
            <div style={legendColorStyle("#9900cc")}></div>
            <span>Rescue</span>
          </div>
          <div style={legendItemStyle}>
            <div style={legendColorStyle("#0099ff")}></div>
            <span>Social</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapView
