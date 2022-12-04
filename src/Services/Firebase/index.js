// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseConfig } from "../config";

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
