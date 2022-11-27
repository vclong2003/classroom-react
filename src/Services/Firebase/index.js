// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  refFromURL,
} from "firebase/storage";

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
const storage = getStorage();

export function uploadFile(folderName, file, uploadingCallback, doneCallback) {
  const storageRef = ref(storage, `${folderName}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploadingCallback(progress);
    },
    (error) => {
      console.log("firebase upload error: " + error);
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        doneCallback(url);
      });
    }
  );
}

export function getFileName(url, callback) {
  const fileRef = ref(storage, url);
  if (fileRef) {
    callback(fileRef.name);
  } else {
    callback("untitled");
  }
}
