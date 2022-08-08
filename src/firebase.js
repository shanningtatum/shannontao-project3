// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDbaJfMhnBOjHp2_YUzUHmfRhoK04R45Mw",

  authDomain: "ubereats-bill.firebaseapp.com",

  projectId: "ubereats-bill",

  storageBucket: "ubereats-bill.appspot.com",

  messagingSenderId: "280224475376",

  appId: "1:280224475376:web:f09db69949beb541763a35",
};

// Initialize Firebase

const firebase = initializeApp(firebaseConfig);

export default firebase;
