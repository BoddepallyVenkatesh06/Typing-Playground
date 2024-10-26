import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCL1zGUtIS9SXM8ALI7dOBIIqR92t6aA90",
    authDomain: "typing-test-aj.firebaseapp.com",
    projectId: "typing-test-aj",
    storageBucket: "typing-test-aj.appspot.com",
    messagingSenderId: "127559460479",
    appId: "1:127559460479:web:9658597f8fab2f2c52814a",
    measurementId: "G-7B01B4D7F0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();

const db = firebaseApp.firestore();

export { auth, db }