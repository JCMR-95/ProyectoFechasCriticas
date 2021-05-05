  
import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyC14X0_BcQR5UBU-nmjBWX14HlLAren83Q",
    authDomain: "fechas-criticas.firebaseapp.com",
    projectId: "fechas-criticas",
    storageBucket: "fechas-criticas.appspot.com",
    messagingSenderId: "358297401133",
    appId: "1:358297401133:web:81d79c91501043dbaa45a4"
  };

// Initialize Firebase

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();

  export default {
      firebase,
      db
  }