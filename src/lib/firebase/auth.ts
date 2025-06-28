import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseFirestore } from './config';
import type { User } from '@/types/auth';

// Helper functions to get Firebase instances safely
const getAuth = () => getFirebaseAuth();
const getDb = () => getFirebaseFirestore();

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Sign in with Google
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const auth = getAuth();
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Create or update user document in Firestore
    await createUserDocument(user);
    
    return await getUserDocument(user.uid);
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string): Promise<User | null> => {
  try {
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);
    return await getUserDocument(result.user.uid);
  } catch (error) {
    console.error('Error signing in with email:', error);
    throw error;
  }
};

// Create account with email and password
export const createAccount = async (
  email: string, 
  password: string, 
  displayName: string
): Promise<User | null> => {
  try {
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update the user's display name
    await updateProfile(result.user, { displayName });
    
    // Create user document in Firestore
    await createUserDocument(result.user);
    
    return await getUserDocument(result.user.uid);
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    const auth = getAuth();
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Create user document in Firestore
const createUserDocument = async (firebaseUser: FirebaseUser): Promise<void> => {
  const db = getDb();
  const userRef = doc(db, 'users', firebaseUser.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    const userData: Omit<User, 'id'> = {
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || '',
      photoURL: firebaseUser.photoURL || undefined,
      createdAt: new Date(),
      preferences: {
        theme: 'system',
        dailyWorkTarget: 6,
        weeklyWorkTarget: 36,
        annualIncomeGoal: 1000000,
        notifications: {
          dailyReminders: true,
          weeklyReviews: true,
          goalDeadlines: true,
        },
      },
    };
    
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
    });
  }
};

// Get user document from Firestore
export const getUserDocument = async (uid: string): Promise<User | null> => {
  try {
    const db = getDb();
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        id: uid,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as User;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user document:', error);
    return null;
  }
};

// Update user document
export const updateUserDocument = async (uid: string, updates: Partial<User>): Promise<void> => {
  try {
    const db = getDb();
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, updates, { merge: true });
  } catch (error) {
    console.error('Error updating user document:', error);
    throw error;
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  const auth = getAuth();
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const user = await getUserDocument(firebaseUser.uid);
      callback(user);
    } else {
      callback(null);
    }
  });
};
