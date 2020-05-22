// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

const firebaseConfig = {
    apiKey: "AIzaSyAOg4cLIb52Zh6juQqJKxm6b44Y742dcbw",
    authDomain: "exp-dev-2ff70.firebaseapp.com",
    databaseURL: "https://exp-dev-2ff70.firebaseio.com",
    projectId: "exp-dev-2ff70",
    storageBucket: "exp-dev-2ff70.appspot.com",
    messagingSenderId: "1074268311404",
    appId: "1:1074268311404:web:25fc97210e4fc4ac4ced49",
    measurementId: "G-JK58RZ54DN"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);


// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
const config = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return false;
        },
        // uiShown: function() {
        //   // The widget is rendered.
        //   // Hide the loader.
        //   document.getElementById('loader').style.display = 'none';
        // }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    //   signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
        // List of OAuth providers supported.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    //   // Terms of service url.
    //   tosUrl: '<your-tos-url>',
    //   // Privacy policy url.
    //   privacyPolicyUrl: '<your-privacy-policy-url>'
};


const db = firebaseApp.firestore();
const userPreparedQuery = (uid) => db.doc(`users/${uid}`);
const getExpenses = (uid) => db.collection(`users/${uid}/expenses`).get();
const addExpense = (uid, expense) => db.collection(`users/${uid}/expenses`).add(expense);

export {
    firebaseApp,
    config as uiConfig,
    ui as firebaseUi,
    userPreparedQuery,
    getExpenses,
    addExpense,
};
 