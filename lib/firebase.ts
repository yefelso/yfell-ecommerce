import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyDgfWATSHtW0cGqpv6aMRIr5t-23w1pEYs",
  authDomain: "yfell-f59ac.firebaseapp.com",
  projectId: "yfell-f59ac",
  storageBucket: "yfell-f59ac.firebasestorage.app",
  messagingSenderId: "73696561528",
  appId: "1:73696561528:web:ea2db7b48a06f76bf0608d",
  measurementId: "G-HQF0N0522F",
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)
const auth = getAuth(app)

// Initialize Analytics only on client side
let analytics
if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}

export { app, db, auth, analytics }
