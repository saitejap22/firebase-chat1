import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBGh2WHSk7R9hnz3Lejq0s-lkCV_Z6skKM",
  authDomain: "chat-status-16ca7.firebaseapp.com",
  projectId: "chat-status-16ca7",
  storageBucket: "chat-status-16ca7.appspot.com",
  messagingSenderId: "468664559284",
  appId: "1:468664559284:web:0f4316389b1f2e7f5b59e1",
  measurementId: "G-RKL24VRR27",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
