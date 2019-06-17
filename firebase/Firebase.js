import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAbJNHnt7UbVMywofhsTx2V-XRIHwbqfA0",
    authDomain: "native-authenticationa-app.firebaseapp.com",
    databaseURL: "https://native-authenticationa-app.firebaseio.com",
    projectId: "native-authenticationa-app",
    storageBucket: "",
    messagingSenderId: "524393402451",
    appId: "1:524393402451:web:9a1d6ecbe9c1bf90"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;