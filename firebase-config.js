// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRJPBPmUU9lxcTv_xKhaOebPhcVJlHtgY",
    authDomain: "saveup-baa19.firebaseapp.com",
    projectId: "saveup-baa19",
    storageBucket: "saveup-baa19.firebasestorage.app",
    messagingSenderId: "185527062347",
    appId: "1:185527062347:web:b3590315906f2c8f8fe3206"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Set persistence to LOCAL
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch((error) => {
    console.error("Persistence error:", error);
});