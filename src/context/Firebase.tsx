"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth"

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDDjSYDbw-3E88kHKsmV-2sNqUpTQH2kGo",
  authDomain: "superherosafety.firebaseapp.com",
  projectId: "superherosafety",
  storageBucket: "superherosafety.firebasestorage.app",
  messagingSenderId: "324619245912",
  appId: "1:324619245912:web:1343787388cfc197cbed2d",
  measurementId: "G-EYFL4LT83R",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

// Define event type
export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  category: string
  description: string
  image: string
  attendees?: { id: string; name: string; profilePicture: string }[] 
}

// Define user type
export interface User {
  id: string
  name: string
  email: string
  profilePicture: string
  eventsAttending: Event[] 
}

// Define context type
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  signInWithGoogle: () => Promise<boolean>
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [events, setEvents] = useState<Event[]>([])

  // Helper to format Firebase user into our User model
  const formatUser = (firebaseUser: FirebaseUser): User => ({
    id: firebaseUser.uid,
    name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Anonymous",
    email: firebaseUser.email || "",
    profilePicture:
      firebaseUser.photoURL ||
      `https://ui-avatars.com/api/?name=${firebaseUser.email?.split("@")[0]}&background=3B82F6&color=fff&size=128`,
    eventsAttending: events, // ← using the Firestore events
  })

  // Load events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events") // Your Firestore collection name
        const eventsSnapshot = await getDocs(eventsCollection)
        const eventsList: Event[] = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Event, "id">),
        }))
        setEvents(eventsList)
      } catch (error) {
        console.error("Error fetching events:", error)
      }
    }

    fetchEvents()
  }, [])

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(formatUser(firebaseUser))
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    })
    return () => unsubscribe()
  }, [events]) // Re-run whenever events change

  // Login with email/password
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  // Signup with email/password
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const newUser = userCredential.user

      // Update the user's display name
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name })
      }

      // Format the user data to store in Firestore
      const userData: User = formatUser(newUser)

      // Add the new user to the Firestore "users" collection
      const usersCollection = collection(db, "users")
      await addDoc(usersCollection, {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        profilePicture: userData.profilePicture,
        eventsAttending: [],
      })

      // Update the user state
      setUser(userData)
      setIsAuthenticated(true)

      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  // Sign in with Google
  const signInWithGoogle = async (): Promise<boolean> => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const firebaseUser = result.user
      setUser(formatUser(firebaseUser))
      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error("Google Sign-In error:", error)
      return false
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
