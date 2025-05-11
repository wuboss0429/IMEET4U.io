// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("Firebase initialized:", app); // 確認 Firebase 是否初始化
console.log("Auth instance:", auth); // 確認 auth 是否正確



//submit
const form = document.getElementById('login-form');
if (!form) {
    console.error("Login form not found");
    return;
  }
form.addEventListener("submit", function (event) {
    event.preventDefault();
    //input
    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginpassword').value;

    //alert(5)
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
    // Signed in
    const user = userCredential.user;
    alert("login account.")
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
    });
})
