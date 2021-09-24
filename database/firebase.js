  
import 'firebase/firestore';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyC14X0_BcQR5UBU-nmjBWX14HlLAren83Q",
  authDomain: "fechas-criticas.firebaseapp.com",
  projectId: "fechas-criticas",
  storageBucket: "fechas-criticas.appspot.com",
  messagingSenderId: "358297401133",
  appId: "1:358297401133:web:81d79c91501043dbaa45a4"
};

// Initialize Firebase

var firebaseApp;

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const storage = firebase.storage();

export default {
    firebase,
    firebaseApp,
    storage,
    db
}