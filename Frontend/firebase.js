// Import the functions you need from the SDKs you need
import { initializeApp, getApps  } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG94DoXxcqWPHr2KnzD33fkOyyvr8sDFk",
  authDomain: "aerosmart-957e7.firebaseapp.com",
  projectId: "aerosmart-957e7",
  storageBucket: "aerosmart-957e7.appspot.com",
  messagingSenderId: "146621481710",
  appId: "1:146621481710:web:4d19a92d11a0cc3081a9ff",
  measurementId: "G-F0HFD93FTC"
};

// Initialize Firebase
export const  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// export const db = getFirestore(app);
// export const storage = getStorage(app)
