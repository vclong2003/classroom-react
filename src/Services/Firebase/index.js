// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmbC5G1T2t30FNtfL0cre35gtcbmlWu3o",
  authDomain: "webg301-2a3d7.firebaseapp.com",
  projectId: "webg301-2a3d7",
  storageBucket: "webg301-2a3d7.appspot.com",
  messagingSenderId: "400399771722",
  appId: "1:400399771722:web:c70b3b644b8109ec0a5eb3",
  measurementId: "G-BQXBE984GH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
