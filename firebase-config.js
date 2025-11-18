// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyAFIpyjJc1ciuIDYnx19LQMj_rp-PawVgQ",
    authDomain: "parallax-ai-13db8.firebaseapp.com",
    databaseURL: "https://parallax-ai-13db8-default-rtdb.europe-central1.firebasedatabase.app",
    projectId: "parallax-ai-13db8",
    storageBucket: "parallax-ai-13db8.firebasestorage.app",
    messagingSenderId: "1074202165112",
    appId: "1:1074202165112:web:212fba00ad11a48b01528d"
};

// Инициализация Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
}