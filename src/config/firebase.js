import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { API_KEY, PROJECT_ID } from '../../keys';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: '1015370273143',
  appId: '1:1015370273143:web:cb6e5e094d178d10ba1172'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
