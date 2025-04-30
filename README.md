# HeroLink (UWB 2025 Hackathon - Entertainment Track)


![hero-banner](https://user-images.githubusercontent.com/your-image-url/banner.png)

## Overview  
HeroLink is a gamified web application designed to incentivize volunteering and community service. Built with React and Firebase, it allows nonprofits to post events and users to sign up, track their service hours, and build a portfolio of verified impact. The system integrates real-time updates, authentication, and user-friendly interfaces to streamline community engagement.

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
Sam Pasarakonda, Caleb Tan, Lixuan Dai, Nathaniel  
University of Washington – CSS 360 Team Project  

Let me know if you'd like me to export this to a markdown file or add Firebase setup instructions!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
