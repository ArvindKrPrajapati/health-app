import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCVi0Q2sjF_9BlYmoLk28QJVDEG1rSyOGM",
    authDomain: "healthapp-7314d.firebaseapp.com",
    databaseURL: "https://healthapp-7314d-default-rtdb.firebaseio.com",
    projectId: "healthapp-7314d",
    storageBucket: "healthapp-7314d.appspot.com",
    messagingSenderId: "606591288451",
    appId: "1:606591288451:web:4fc7742b184a724a6ec7b6",
    measurementId: "G-MJ9K81GT3Y"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
export { db };