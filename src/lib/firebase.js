import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp, 
  serverTimestamp 
} from "firebase/firestore";

// Define types for our data
/**
 * @typedef {Object} Schedule
 * @property {string} id - The document ID
 * @property {string} userId - The user ID this schedule belongs to
 * @property {string} userName - The name of the user
 * @property {string} date - The date of the schedule
 * @property {string} time - The time of the schedule
 * @property {string} status - The status of the schedule
 * @property {Date} [createdAt] - When the schedule was created
 * @property {Date} [updatedAt] - When the schedule was last updated
 */

/**
 * @typedef {Object} ScheduleCheckResult
 * @property {boolean} exists - Whether a schedule exists
 * @property {Schedule|null} schedule - The schedule if it exists, null otherwise
 */

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Collection references
const usersCollection = collection(db, "users");
const schedulesCollection = collection(db, "schedules");

// Helper functions for Users
const createUser = async (userData) => {
  return await addDoc(usersCollection, {
    ...userData,
    createdAt: serverTimestamp()
  });
};

const getUserById = async (userId) => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    return { id: userDoc.id, ...userDoc.data() };
  } else {
    return null;
  }
};

const getAllUsers = async () => {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const updateUser = async (userId, userData) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, userData);
  return true;
};

// Helper functions for Schedules
const createSchedule = async (scheduleData) => {
  return await addDoc(schedulesCollection, {
    ...scheduleData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

// Check if a demo schedule already exists for a given email or mobile number
/**
 * @param {string} email - The email to check
 * @param {string} mobileNumber - The mobile number to check
 * @returns {Promise<ScheduleCheckResult>} - The result of the check
 */
const checkExistingDemoSchedule = async (email, mobileNumber) => {
  // First, find users with the given email or mobile number
  const usersQuery = query(
    usersCollection,
    where("role", "==", "demo_student"),
    where("email", "==", email)
  );
  
  const usersSnapshot = await getDocs(usersQuery);
  const userIds = usersSnapshot.docs.map(doc => doc.id);
  
  // If no users found with the email, try mobile number
  if (userIds.length === 0) {
    const mobileQuery = query(
      usersCollection,
      where("role", "==", "demo_student"),
      where("mobileNumber", "==", mobileNumber)
    );
    
    const mobileSnapshot = await getDocs(mobileQuery);
    userIds.push(...mobileSnapshot.docs.map(doc => doc.id));
  }
  
  // If we found any users, check if they have demo schedules
  if (userIds.length > 0) {
    for (const userId of userIds) {
      const scheduleQuery = query(
        schedulesCollection,
        where("userId", "==", userId),
        where("status", "==", "demo_scheduled")
      );
      
      const scheduleSnapshot = await getDocs(scheduleQuery);
      if (!scheduleSnapshot.empty) {
        // Return the first matching schedule
        const schedule = scheduleSnapshot.docs[0];
        return { 
          exists: true, 
          schedule: { id: schedule.id, ...schedule.data() } 
        };
      }
    }
  }
  
  return { exists: false, schedule: null };
};

const getScheduleById = async (scheduleId) => {
  const scheduleDoc = await getDoc(doc(db, "schedules", scheduleId));
  if (scheduleDoc.exists()) {
    return { id: scheduleDoc.id, ...scheduleDoc.data() };
  } else {
    return null;
  }
};

const getUserSchedules = async (userId) => {
  const q = query(
    schedulesCollection, 
    where("userId", "==", userId),
    orderBy("date", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getAllSchedules = async () => {
  const snapshot = await getDocs(schedulesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const updateSchedule = async (scheduleId, scheduleData) => {
  const scheduleRef = doc(db, "schedules", scheduleId);
  await updateDoc(scheduleRef, {
    ...scheduleData,
    updatedAt: serverTimestamp()
  });
  return true;
};

const deleteSchedule = async (scheduleId) => {
  await deleteDoc(doc(db, "schedules", scheduleId));
  return true;
};

export { 
  auth, 
  db, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc,
  query,
  where,
  orderBy,
  Timestamp,
  // User functions
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  // Schedule functions
  createSchedule,
  getScheduleById,
  getUserSchedules,
  getAllSchedules,
  updateSchedule,
  deleteSchedule,
  checkExistingDemoSchedule
};
