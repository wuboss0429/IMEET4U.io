import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

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

    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginpassword').value;

    //alert(5); // 測試事件是否觸發
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("login account.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/invalid-credential") {
          if (password) {
            alert("Wrong password");
          } else {
            alert("Email Not Registered");
          }
        } else {
          alert(errorMessage);
        }
      });
  });
});
