// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// import { getStorage } from 'firebase/storage';

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyADsU2xCNR2WBw0rhLPTqcbu-zNdK4OWSA',
  authDomain: 'dms-app-1f5bd.firebaseapp.com',
  projectId: 'dms-app-1f5bd',
  storageBucket: 'dms-app-1f5bd.appspot.com',
  messagingSenderId: '610462937162',
  appId: '1:610462937162:web:d4e00e87c277ef2d3fb6b3',
  measurementId: 'G-GJQ48XWNVG',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const storage = getStorage(app);
