import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';

// Firebase configuration - replace with your own values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// User role type
export type UserRole = 'admin' | 'teacher' | 'staff';

// User type extended with role
export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  department?: string;
  position?: string;
  createdAt: Date;
  createdBy?: string;
  phoneNumber?: string;
}

// Create a new user with role
export const createUser = async (
  email: string, 
  password: string, 
  role: UserRole, 
  displayName: string,
  createdBy: string,
  additionalData?: Partial<UserData>
): Promise<UserData> => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile with display name
    await updateProfile(user, { displayName });
    
    // Create user record in Firestore with role
    const userData: UserData = {
      uid: user.uid,
      email: user.email || email,
      displayName,
      role,
      createdAt: new Date(),
      createdBy,
      ...additionalData
    };
    
    await setDoc(doc(db, 'users', user.uid), userData);
    
    return userData;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Sign in user
export const signInUser = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign out user
export const signOutUser = async () => {
  return signOut(auth);
};

// Get current user data including role
export const getCurrentUserData = async (): Promise<UserData | null> => {
  const user = auth.currentUser;
  
  if (!user) return null;
  
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Get user data by ID
export const getUserById = async (uid: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Get all users with a specific role
export const getUsersByRole = async (role: UserRole): Promise<UserData[]> => {
  try {
    const usersQuery = query(collection(db, 'users'), where('role', '==', role));
    const usersSnapshot = await getDocs(usersQuery);
    
    return usersSnapshot.docs.map((doc) => doc.data() as UserData);
  } catch (error) {
    console.error('Error getting users by role:', error);
    return [];
  }
};

// Update user data
export const updateUserData = async (uid: string, data: Partial<UserData>): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', uid), data);
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// Delete user
export const deleteUserData = async (uid: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'users', uid));
    // Note: This only deletes the Firestore document
    // To fully delete a user, you would also need to delete from Firebase Auth
  } catch (error) {
    console.error('Error deleting user data:', error);
    throw error;
  }
}; 