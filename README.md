# HeroLink (UWB 2025 Hackathon - Entertainment Track)


![HEROLINK Superhero Safety Network](https://github.com/user-attachments/assets/3f302ebc-d28e-413c-a968-f9c326b8b7d3)

## Overview  
HeroLink is a gamified web application designed to incentivize volunteering and community service. Built with React and Firebase, it allows nonprofits to post events and users to sign up, track their service hours, and build a portfolio of verified impact. The system integrates real-time updates, authentication, and user-friendly interfaces to streamline community engagement.
- Link: https://tinyurl.com/HeroLinkHack

## Why We Made This  
We created HeroLink to make volunteering more accessible and rewarding for everyone—especially students and local organizations. Most platforms are either too complex or lack gamification. By integrating badges, points, and service verification, HeroLink transforms good deeds into tangible accomplishments. Our goal is to encourage people to take action in their communities while gaining recognition for their efforts.

## Features  
- **User Authentication**: Sign in with email/password using Firebase Auth  
- **Event Management**: Create, browse, and register for community events  
- **Gamification**: Earn badges, track hours, and level up based on participation  
- **Real-Time Database**: Events and user profiles update instantly via Firestore  
- **Interactive UI**: Fully responsive layout with Tailwind CSS styling  
- **Dynamic Routing**: Client-side navigation with React Router

## How to Run  

1. **Clone the repository**:  
   ```bash
   git clone <repository_url>
   cd herolink
   ```

2. **Install dependencies**:  
   ```bash
   npm install
   ```

3. **Run the development server**:  
   ```bash
   npm start
   ```

4. **Access the app**:  
   Open `http://localhost:3000` in your browser  

## Technologies Used  

**Frontend**  
- React (TypeScript)  
- Tailwind CSS  
- React Router  

**Backend / Services**  
- Firebase Authentication  
- Firestore Database  
- Google Maps API (for future event geolocation features)

**Deployment**  
- Vercel  

## How It Works  

- **User Flow**: Upon authentication, users are redirected to a personalized homepage. They can register for events, track attendance, and unlock badges as they complete verified activities.  
- **Firestore Integration**: All user and event data is stored in Firestore, enabling real-time updates across the platform.  
- **Admin Tools**: Nonprofits can manage and post events through a dedicated interface.

## Technical Design  

- **State Management**: Local state and context API are used to handle UI and auth flows.  
- **Security**: Firebase Rules secure database read/write permissions based on user roles.  
- **Gamified Logic**: Badge unlocking and experience points are calculated and stored per user.  
- **Component Architecture**: Designed for scalability with reusable React components and modular CSS styling.

## Testing  

- **Manual Testing**: Functional testing of registration, login, event flows, and badge logic  
- **Unit Tests** (Planned): To validate service logic and form validations  
- **Integration Tests** (Planned): End-to-end testing using tools like Cypress or Playwright  

## Contributions  
Want to improve HeroLink? Feel free to contribute new features like dark mode, leaderboard integration, or enhanced analytics for nonprofits. Open a PR or start a discussion!

---

### Authors  
Enkhjinjeje Chuluunkhuu, Sam Pasarakonda, Dylan Vosef, Ava Calpe 

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
