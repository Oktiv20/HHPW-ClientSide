import firebase from 'firebase/app';
import 'firebase/auth';
import { clientCredentials } from './client';

const dbUrl = clientCredentials.databaseURL;

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/checkuser/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const registerUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/register/employee`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (response) => {
      if (response.ok) {
        const data = await response.text();
        resolve(data);
      }
    })
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn, //
  signOut,
  checkUser,
  registerUser,
};
