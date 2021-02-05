import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore'


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDRPcprcLQyvbgBgwOz2ecH6RL_rOmwmiw",
  authDomain: "react-firegram-c724f.firebaseapp.com",
  projectId: "react-firegram-c724f",
  storageBucket: "react-firegram-c724f.appspot.com",
  messagingSenderId: "90578646173",
  appId: "1:90578646173:web:109e6812412ce386261074"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);