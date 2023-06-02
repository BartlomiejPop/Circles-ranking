import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref, set, child, get, update } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firebaseConfig = {
  apiKey: 'AIzaSyApgtQH9TpXuGobxQfeZcPYiF2US1oLQrA',
  authDomain: 'circles-ranking.firebaseapp.com',
  databaseURL: 'https://circles-ranking-default-rtdb.firebaseio.com',
  projectId: 'circles-ranking',
  storageBucket: 'circles-ranking.appspot.com',
  messagingSenderId: '887086823949',
  appId: '1:887086823949:web:13d21ff9c3739fb70b7344',
  measurementId: 'G-DHEYVW0W7P',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth(app);
const dbRef = ref(getDatabase());
const emailInputEl = document.querySelector('.email-input');
const passwordInputEl = document.querySelector('.password-input');
const logInBtn = document.querySelector('.login-btn');
const registerBtn = document.querySelector('.register-btn');
let user;
let id;
let loginEmail;
let loginPassword;
let scorePoints;
console.log('firebaseeee');

onAuthStateChanged(auth, currentUser => {
  if (currentUser) {
    user = currentUser;
    logged(currentUser.email);
  } else {
    // loggedOut();
  }
});

document.getElementById('log-btn').addEventListener('click', function () {
  loginEmail = document.getElementById('login-email').value;
  loginPassword = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(userCredential => {
      Notify.success(`Succesfully logged in`, {
        timeout: 1000,
      });
      user = userCredential.user;
    })
    .catch(error => {
      const errorMessage = error.message;
      Notify.failure(`${errorMessage}`, {
        timeout: 1000,
      });
    });
});

document.getElementById('register-btn').addEventListener('click', function () {
  loginEmail = document.getElementById('login-email').value;
  loginPassword = document.getElementById('login-password').value;

  createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(userCredential => {
      user = userCredential.user;
      Notify.success(`Succesfully registered! Now log in`, {
        timeout: 1000,
      });
      console.log('registered');
    })
    .catch(error => {
      const errorMessage = error.message;
      Notify.failure(`${errorMessage}`, {
        timeout: 1000,
      });
    });
});

export function setRankingScore() {
  get(child(dbRef, user.id))
    .then(snapshot => {
      if (snapshot.exists()) {
        const updates = {};
        updates[userId] = {
          scorePoints,
        };
        update(ref(db), updates);
      } else {
        set(ref(db, user.id), { scorePoints });
      }
    })
    .catch(error => {
      const errorMessage = error.message;
      Notify.failure(`${errorMessage}`, {
        timeout: 1000,
      });
    });
}
