import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
  onSnapshot,
  QueryConstraint
} from 'firebase/firestore';
import { db } from './config';

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  GOALS: 'goals',
  TASKS: 'tasks',
  TIME_LOGS: 'timeLogs',
  EARNINGS: 'earnings',
  JOURNAL_ENTRIES: 'journalEntries',
} as const;

// Generic CRUD operations
export class FirestoreService {
  // Create document
  static async create<T>(collectionName: string, data: Omit<T, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error(`Error creating document in ${collectionName}:`, error);
      throw error;
    }
  }

  // Read document by ID
  static async getById<T>(collectionName: string, id: string): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate(),
          updatedAt: docSnap.data().updatedAt?.toDate(),
        } as T;
      }
      
      return null;
    } catch (error) {
      console.error(`Error getting document from ${collectionName}:`, error);
      throw error;
    }
  }

  // Update document
  static async update<T>(
    collectionName: string, 
    id: string, 
    updates: Partial<T>
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error);
      throw error;
    }
  }

  // Delete document
  static async delete(collectionName: string, id: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document from ${collectionName}:`, error);
      throw error;
    }
  }

  // Query documents
  static async query<T>(
    collectionName: string,
    constraints: QueryConstraint[] = []
  ): Promise<T[]> {
    try {
      const q = query(collection(db, collectionName), ...constraints);
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as T[];
    } catch (error) {
      console.error(`Error querying ${collectionName}:`, error);
      throw error;
    }
  }

  // Real-time listener
  static onSnapshot<T>(
    collectionName: string,
    constraints: QueryConstraint[],
    callback: (data: T[]) => void
  ) {
    const q = query(collection(db, collectionName), ...constraints);
    
    return onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as T[];
      
      callback(data);
    });
  }
}

// User-specific queries
export const getUserData = async <T>(
  collectionName: string,
  userId: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> => {
  return FirestoreService.query<T>(collectionName, [
    where('userId', '==', userId),
    ...constraints,
  ]);
};

// Date range queries
export const getDataByDateRange = async <T>(
  collectionName: string,
  userId: string,
  startDate: Date,
  endDate: Date,
  dateField = 'date'
): Promise<T[]> => {
  return FirestoreService.query<T>(collectionName, [
    where('userId', '==', userId),
    where(dateField, '>=', Timestamp.fromDate(startDate)),
    where(dateField, '<=', Timestamp.fromDate(endDate)),
    orderBy(dateField, 'desc'),
  ]);
};

// Recent data queries
export const getRecentData = async <T>(
  collectionName: string,
  userId: string,
  limitCount = 10
): Promise<T[]> => {
  return FirestoreService.query<T>(collectionName, [
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limitCount),
  ]);
};
