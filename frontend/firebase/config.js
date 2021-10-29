import firebase from 'firebase'
require('firebase/auth')

// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB7ns_flqaiYt4ip0RLC66OjO9VeGmi928",
    authDomain: "verify-e2dc7.firebaseapp.com",
    projectId: "verify-e2dc7",
    storageBucket: "verify-e2dc7.appspot.com",
    messagingSenderId: "583606351865",
    appId: "1:583606351865:web:167e5a182c0f5176aaaf28"
  };
// Initialize Firebase

firebase.initializeApp(firebaseConfig);



export default firebase;
