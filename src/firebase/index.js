import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCg8IAqD65LQtO2se8GYw-oOjgLaV2elb8",
  authDomain: "banking-7d700.firebaseapp.com",
  projectId: "banking-7d700",
  storageBucket: "banking-7d700.appspot.com",
  messagingSenderId: "47213383225",
  appId: "1:47213383225:web:629ccc41bb8024cc1907e8",
  measurementId: "G-MLRLWVX05R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {
    auth,
}