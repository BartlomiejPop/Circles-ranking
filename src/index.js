console.log('circles');

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
let user;
let id;
let loginEmail;
let loginPassword;
console.log('firebase');

const containerEl = document.querySelector('.container');
const circleEl = document.querySelector('.circle');
const scoreEl = document.querySelector('.score');
const finalScoreEl = document.querySelector('.final-score');
const playAgainBtn = document.querySelector('.play-again');
const playMusicBtn = document.querySelector('.pause-resume');
const musicVolume = document.querySelector('.volume');
const gameOverEl = document.querySelector('.game-over');
const timerBgEl = document.querySelector('.timer-bg');
const musicEl = document.getElementById('audio');
const clickSound = document.getElementById('click');
const bonusSound = document.getElementById('bonus');
const recordEl = document.querySelector('.record');
const lightmodeEl = document.querySelector('.lightmode');
const darkmodeEl = document.querySelector('.darkmode');
const loginInputEl = document.querySelector('.email-input');
const registerInputEl = document.querySelector('.password-input');
const loginBtn = document.querySelector('.login-btn');
const registerBtn = document.querySelector('.register-btn');
const rankListEl = document.querySelector('.rank-list');
let scorePoints = 0;
let timeOut;
let timer;
let bonusTime = 0;
let bgInterval;
clickSound.volume = 0.1;
bonusSound.volume = 0.2;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const generateCircle = timer => {
  circleEl.style.display = 'flex';
  circleEl.style.top =
    window.innerHeight * 0.05 +
    Math.random(window.innerHeight) * 0.7 * window.innerHeight +
    'px';
  circleEl.style.left =
    window.innerWidth * 0.05 +
    Math.random(window.innerWidth) * 0.7 * window.innerWidth +
    'px';
  circleEl.style.backgroundColor = getRandomHexColor();
  timeOut = setTimeout(() => {
    gameOver(scorePoints);
  }, timer);
};

const gameOver = record => {
  circleEl.style.display = 'none';
  gameOverEl.style.display = 'flex';
  finalScoreEl.textContent = `Time's up! Your score is: ${scorePoints}`;
  scorePoints = 0;
  scoreEl.innerText = scorePoints;
  timerBgEl.style.display = 'none';
  clearInterval(bgInterval);
  if (localStorage.getItem('NewRecord') == 0) {
    localStorage.setItem('NewRecord', record);
  }
  if (localStorage.getItem('NewRecord') < record) {
    localStorage.setItem('NewRecord', record);
    setRankingScore(record);
  }
  recordEl.textContent = ` record: ${localStorage.getItem('NewRecord')}`;
};

const handleCircleClick = () => {
  circleEl.style.display = 'none';
  clickSound.play();
  scorePoints++;
  timerBgEl.textContent = timer + +bonusTime + 'ms';
  clearTimeout(timeOut);
  generateCircle(timer);
  scoreEl.innerText = scorePoints;
  if (scorePoints >= 100 && scorePoints < 200) {
    circleEl.style.border = ' 10px double rgb(255, 255, 255)';
  } else if (scorePoints >= 200 && scorePoints < 300) {
    circleEl.style.border = ' 10px dotted rgb(255, 255, 255)';
  } else if (scorePoints >= 300) {
    circleEl.style.border = ' 8px dashed rgb(255, 255, 255)';
  }
};

const generateEvent = () => {
  const circleEvent = document.createElement('div');
  circleEvent.classList.add('circle-event');
  circleEvent.style.display = 'flex';
  circleEvent.innerHTML = "<span class='score'>+0.1s</span>";
  circleEvent.style.top =
    Math.random(window.innerHeight) * 0.5 * window.innerHeight + 'px';
  circleEvent.style.left =
    Math.random(window.innerWidth) * 0.5 * window.innerWidth + 'px';
  containerEl.appendChild(circleEvent);
  setTimeout(() => {
    circleEvent.style.display = 'none';
  }, 1200);
  circleEvent.addEventListener('mousedown', () => {
    timer += 100;
    timerBgEl.textContent = timer + +bonusTime + 'ms';
    bonusSound.play();
    circleEvent.style.display = 'none';
  });
};

const updateTimerBg = () => {
  timer -= 10;
  timerBgEl.textContent = timer + 'ms';
};

const setDarkMode = () => {
  playAgainBtn.style.backgroundColor = ' rgb(255, 255, 255, 0.2)';
  playAgainBtn.style.color = ' rgb(255, 255, 255, 0.5)';
  document.querySelector('body').style.backgroundImage =
    'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6WPYoOL4wCrFoXXSCxZNLhZ4y1b8XrY26l2y3js1dDOD3Ffc1eWfT26yySZIzieWOpQE&usqp=CAU)';
  document.querySelector('body').style.backgroundSize = '37px';
  document.querySelector('body').style.animation =
    'bg-scrolling-dark 1.44s infinite linear';
  timerBgEl.style.color = 'rgb(150, 150, 150,0.35)';
  playMusicBtn.style.backgroundColor = 'rgb(255, 255, 255, 0.2)';
  playMusicBtn.style.color = ' rgb(255, 255, 255, 0.5)';
  localStorage.setItem('mode', 'dark');
  circleEl.style.boxShadow = '9px 9px 44px 16px rgb(128, 129, 141)';
  loginInputEl.style.color = 'rgb(255, 255, 255, 0.5)';
  loginInputEl.style.backgroundColor = 'rgb(255, 255, 255, 0.2)';
  registerInputEl.style.color = 'rgb(255, 255, 255, 0.5)';
  registerInputEl.style.backgroundColor = 'rgb(255, 255, 255, 0.2)';
  loginBtn.style.color = 'rgb(255, 255, 255, 0.5)';
  loginBtn.style.backgroundColor = 'rgb(255, 255, 255, 0.2)';
  registerBtn.style.color = 'rgb(255, 255, 255, 0.5)';
  registerBtn.style.backgroundColor = 'rgb(255, 255, 255, 0.2)';
};

const setLightMode = () => {
  document.querySelector('body').style.background = '';
  playAgainBtn.style.backgroundColor = ' rgb(119, 119, 119, 0.15)';
  timerBgEl.style.color = 'rgb(154, 154, 154, 0.3)';
  document.querySelector('body').style.backgroundSize = '';
  document.querySelector('body').style.animation =
    'bg-scrolling 0.32s infinite linear';
  playMusicBtn.style.backgroundColor = ' rgba(66, 68, 90, 0.1)';
  playAgainBtn.style.color = ' rgb(119, 119, 119)';
  playMusicBtn.style.color = ' rgb(119, 119, 119)';
  localStorage.setItem('mode', 'light');
  circleEl.style.boxShadow = '9px 9px 44px 16px rgb(128, 129, 141)';
  loginInputEl.style.color = ' rgb(119, 119, 119)';
  loginInputEl.style.backgroundColor = 'rgba(66, 68, 90, 0.1)';
  registerInputEl.style.color = ' rgb(119, 119, 119)';
  registerInputEl.style.backgroundColor = 'rgba(66, 68, 90, 0.1)';
  loginBtn.style.color = 'rgb(119, 119, 119)';
  loginBtn.style.backgroundColor = 'rgba(66, 68, 90, 0.1)';
  registerBtn.style.color = 'rgb(119, 119, 119)';
  registerBtn.style.backgroundColor = 'rgba(66, 68, 90, 0.1)';
};

const setColorMode = () => {
  if (localStorage.getItem('mode') === 'dark') {
    setDarkMode();
  } else {
    setLightMode();
  }
};

circleEl.addEventListener('mousedown', () => {
  handleCircleClick();
  const RNGvalue = Math.random(1);
  if (RNGvalue < 0.04) {
    generateEvent();
  }
});

// OPTIONS

playAgainBtn.addEventListener('click', () => {
  timer = 1000;
  bonusTime = 0;
  timerBgEl.textContent = timer + 'ms';
  timerBgEl.style.display = 'block';
  gameOverEl.style.display = 'none';
  setTimeout(() => {
    generateCircle(timer);
  }, 500);
  bgInterval = setInterval(updateTimerBg, 1000);
  circleEl.style.border = ' 8px solid rgb(255, 255, 255)';
});

playMusicBtn.addEventListener('mousedown', () => {
  if (playMusicBtn.innerHTML == `<i class="fa-solid fa-play"></i>`) {
    musicEl.play();
    musicEl.volume = musicVolume.value / 100;
    playMusicBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  } else {
    musicEl.pause();
    playMusicBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  }
});

musicVolume.addEventListener('input', () => {
  musicEl.volume = musicVolume.value / 100;
});

darkmodeEl.addEventListener('mousedown', setDarkMode);
lightmodeEl.addEventListener('mousedown', setLightMode);

setColorMode();

// // // // // // // // // // // // // //

// // // // // // // // // // // // // //

// // // // // // // // // // // // // //

//FIREBASE

// // // // // // // // // // // // // //

// // // // // // // // // // // // // //

// // // // // // // // // // // // // //

onAuthStateChanged(auth, currentUser => {
  if (currentUser) {
    user = currentUser;
    // logged(currentUser.email);
  } else {
    // loggedOut();
  }
});

document.getElementById('log-btn').addEventListener('click', function () {
  loginEmail = document.getElementById('login-email').value;
  loginPassword = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(userCredential => {
      user = userCredential.user;
      Notify.success(`Succesfully logged in`, {
        timeout: 1000,
      });
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

function setRankingScore(record) {
  get(child(dbRef, 'records/' + user.uid))
    .then(snapshot => {
      if (snapshot.exists()) {
        const updates = {};
        updates['records/' + user.uid] = {
          record: record,
        };
        update(ref(db), updates);
      } else {
        set(ref(db, 'records/' + user.uid), { record: record });
      }
    })
    .catch(error => {
      const errorMessage = error.message;
      Notify.failure(`${errorMessage}`, {
        timeout: 1000,
      });
    });
}

function getRankingScore() {
  get(child(dbRef, 'records'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const rankingObject = Object.values(snapshot.val());
        console.log(rankListEl);
        rankingObject.forEach(el => console.log(Object.keys(el)[0], el.record));
        rankingObject.forEach(
          el =>
            (rankListEl.innerHTML += `<li class='rank-list-record'>${
              Object.keys(el)[0]
            } : ${el.record}</li>`)
        );
      }
    })
    .catch(error => {
      const errorMessage = error.message;
      Notify.failure(`${errorMessage}`, {
        timeout: 1000,
      });
    });
}
getRankingScore();
