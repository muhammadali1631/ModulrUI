import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "virtualui-36a36.firebaseapp.com",
  projectId: "virtualui-36a36",
  storageBucket: "virtualui-36a36.firebasestorage.app",
  messagingSenderId: "131861167337",
  appId: "1:131861167337:web:3045a53c276578dea24478"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}