import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDW-DbkCO6eOB6N1V0Xdgnyp0qMvDW_zvc",
  authDomain: "advo-ai-mag.firebaseapp.com",
  projectId: "advo-ai-mag",
  storageBucket: "advo-ai-mag.appspot.com",
  messagingSenderId: "122213744402",
  appId: "1:122213744402:web:85316e7f058dce5cef3dcb",
  measurementId: "G-P2FCSGN8G8"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };