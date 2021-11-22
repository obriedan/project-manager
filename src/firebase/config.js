import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCLegk2N8jZe84zkBteEbIlrhKjQRJzeXs',
  authDomain: 'project-manager-58279.firebaseapp.com',
  projectId: 'project-manager-58279',
  storageBucket: 'project-manager-58279.appspot.com',
  messagingSenderId: '422599832483',
  appId: '1:422599832483:web:90f64e2398f1588d8ca016',
  measurementId: 'G-08LC96BQKV',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp

const timestamp = firebase.firestore.Timestamp;

export { projectAuth, projectFirestore, timestamp };
