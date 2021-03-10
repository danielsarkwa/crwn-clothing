import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "API-KEY-HERE",
    authDomain: "YOUR-DOMAIN.firebaseapp.com",
    databaseURL: "https://YOUR-DOMAIN.firebaseio.com",
    projectId: "YOUR-DOMAIN",
    storageBucket: "YOUR-DOMAIN.appspot.com",
    messagingSenderId: "740933472539",
    appId: "1:740933472539:web:e44cc96677fa8d531043be",
    measurementId: "G-P3TC9XLKG7"
  };

export const createUserProfileDocument = async (userAuth, addtionalData) => {
    if(!userAuth) return;

    // this constains the meta data of document location on firebase
    // this is the current place in the database that we are querying
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...addtionalData
        });
      } catch(e) {
        console.log('error creating user', e.mesage);
      }
    }

    return userRef;
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () =>  auth.signInWithPopup(provider);

export default firebase;
