import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyALscFG5EEzN5KanfiXzdw59nxh62z81OA",
  authDomain: "imeet4u-98171.firebaseapp.com",
  databaseURL: "https://imeet4u-98171-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "imeet4u-98171",
  storageBucket: "imeet4u-98171.firebasestorage.app",
  messagingSenderId: "979771631163",
  appId: "1:979771631163:web:dce049c4aef81067295e1e",
  measurementId: "G-5ZRQ2583VF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("Firebase initialized:", app);
console.log("Auth instance:", auth);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('login-form');
  if (!form) {
    console.error("Login form not found");
    return;
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById('loginemail').value.trim().toLowerCase();
    const password = document.getElementById('loginpassword').value;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    console.log("Attempting login with email:", email); // 診斷用
    fetchSignInMethodsForEmail(auth, email)
      .then((signInMethods) => {
        console.log("Sign-in methods:", signInMethods); // 診斷用
        if (!signInMethods || signInMethods.length === 0) {
          console.log("No sign-in methods found for email:", email); // 診斷用
          alert("Email Not Registered");
          return Promise.reject(new Error("Email Not Registered"));
        }
        console.log("Proceeding with sign-in for email:", email); // 診斷用
        return signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            alert("login account.");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Sign-in error:", error); // 診斷用
            if (errorCode === "auth/invalid-credential" || errorCode === "auth/wrong-password") {
              alert("Wrong password.");
            } else {
              alert(errorMessage);
            }
            throw error;
          });
      })
      .catch((error) => {
        if (error.message !== "Email Not Registered") {
          console.error("Fetch sign-in methods error:", error);
          alert("An error occurred. Please try again.");
        }
      });
  });
});
