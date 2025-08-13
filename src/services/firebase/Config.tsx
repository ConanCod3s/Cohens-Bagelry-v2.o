import {initializeApp} from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

// Ignore this until we need it so we can deploy
// const analytics = getAnalytics(app);

export const app = initializeApp({
    apiKey: "AIzaSyAKGRGM4YLESAb5N9YKSmEBxYbIkjSJNrc",
    authDomain: "cohens-bagelry-8c701.firebaseapp.com",
    projectId: "cohens-bagelry-8c701",
    storageBucket: "cohens-bagelry-8c701.appspot.com",
    messagingSenderId: "643418776638",
    appId: "1:643418776638:web:baf9161a64153d1dff5d6f",
    measurementId: "G-529GFS0Y4V"
});