import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKkvQrpqR0iWNrXSOjsHjllFgwpnAB7aY",
  authDomain: "project-1100779858743235788.firebaseapp.com",
  projectId: "project-1100779858743235788",
  storageBucket: "project-1100779858743235788.appspot.com",
  messagingSenderId: "926625345465",
  appId: "1:926625345465:web:3ba62198debba558779068",
  measurementId: "G-B46MRYCNXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage();