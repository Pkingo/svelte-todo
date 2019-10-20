import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './config';

const firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: 'braetspilsministeriet-fe76f.firebaseapp.com',
  databaseURL: 'https://braetspilsministeriet-fe76f.firebaseio.com',
  projectId: 'braetspilsministeriet-fe76f',
  storageBucket: 'braetspilsministeriet-fe76f.appspot.com',
  messagingSenderId: '1015370273143',
  appId: '1:1015370273143:web:cb6e5e094d178d10ba1172'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
