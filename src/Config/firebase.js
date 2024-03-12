import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDGRLW8tQ8ZkPQgeIhtS7PbvauBhSGAS34",
  authDomain: "daily-transaction-e4d01.firebaseapp.com",
  projectId: "daily-transaction-e4d01",
  storageBucket: "daily-transaction-e4d01.appspot.com",
  messagingSenderId: "535829112688",
  appId: "1:535829112688:web:aae74ffe3ec395084551b5",
  databaseURL : "https://daily-transaction-e4d01-default-rtdb.firebaseio.com"
};


export const app = initializeApp(firebaseConfig);