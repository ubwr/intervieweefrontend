import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "your_key",
  authDomain: "your_domain",
  projectId: "project_id",
  storageBucket: "your_bucket",
  messagingSenderId: "sender_id",
  appId: "app_id",
  measurementId: "measurement_id"
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const analytics = getAnalytics(app);

export default firebase;