import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Initialize Firebase app (singleton pattern)
let app: FirebaseApp;

function getFirebaseConfig() {
  // Only access environment variables when needed and on client side
  if (typeof window === 'undefined') {
    throw new Error('Firebase configuration can only be accessed on the client side');
  }

  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  // Validate required environment variables
  const requiredEnvVars = [
    { key: 'NEXT_PUBLIC_FIREBASE_API_KEY', value: config.apiKey },
    { key: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', value: config.authDomain },
    { key: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', value: config.projectId },
    { key: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', value: config.storageBucket },
    { key: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', value: config.messagingSenderId },
    { key: 'NEXT_PUBLIC_FIREBASE_APP_ID', value: config.appId },
  ];

  for (const { key, value } of requiredEnvVars) {
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  return config;
}

function getFirebaseApp(): FirebaseApp {
  if (typeof window === 'undefined') {
    throw new Error('Firebase can only be used on the client side');
  }

  if (!app) {
    const firebaseConfig = getFirebaseConfig();
    // Initialize or get existing app
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
}

// Initialize Firebase services with lazy loading
export function getFirebaseAuth(): Auth {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Auth can only be used on the client side');
  }
  return getAuth(getFirebaseApp());
}

export function getFirebaseFirestore(): Firestore {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Firestore can only be used on the client side');
  }
  return getFirestore(getFirebaseApp());
}

// Export for backward compatibility (lazy initialization)
export const auth = typeof window !== 'undefined' ? (() => {
  try {
    return getFirebaseAuth();
  } catch {
    return null;
  }
})() : null;

export const db = typeof window !== 'undefined' ? (() => {
  try {
    return getFirebaseFirestore();
  } catch {
    return null;
  }
})() : null;

// Initialize Analytics (only in browser environment)
export const getAnalyticsInstance = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    try {
      return getAnalytics(getFirebaseApp());
    } catch {
      return null;
    }
  }
  return null;
};
