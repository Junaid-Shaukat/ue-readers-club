
// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCQShh-3C22kjXc8R2SBn8dO7PIbU7iT80",
    authDomain: "ue-readers-club.firebaseapp.com",
    projectId: "ue-readers-club",
    storageBucket: "ue-readers-club.appspot.com",
    messagingSenderId: "1040364008256",
    appId: "1:1040364008256:web:71a605b1d8a95cfa0dc0a5",
    measurementId: "G-JSYDX81ZBB"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };