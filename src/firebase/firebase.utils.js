import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyB-oHMEDvkF7pYyuzkD-D_5-Cd2UE9oqWY",
  authDomain: "crwn-clothing-2-8eab9.firebaseapp.com",
  databaseURL: "https://crwn-clothing-2-8eab9.firebaseio.com",
  projectId: "crwn-clothing-2-8eab9",
  storageBucket: "crwn-clothing-2-8eab9.appspot.com",
  messagingSenderId: "1039117064450",
  appId: "1:1039117064450:web:52756e7a99832f052a4a1b"
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
};

// convert data from firebase to an data structure the app can use
export const converCollectionsSnapshotsToMap = (collection) => {
  const transformedCollections = collection.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  // build the map/object
  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const colllectionRef = firestore.collection(collectionKey);
  console.log(colllectionRef);

  // upload all the data in a single request
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // create the document locally
    const newDocRef = colllectionRef.doc();
    // batch to  -- keep
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
// export const signInWithGoogle = () =>  auth.signInWithPopup(googleProvider);

export default firebase;
