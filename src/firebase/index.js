import * as firebase from 'firebase/app'
import 'firebase/firestore';

const app = firebase.initializeApp ({
    apiKey: "AIzaSyCyUxOAlt2aqeL7nV2GIRCmr7GElovTXHM",
    authDomain: "av-popstore.firebaseapp.com",
    projectId: "av-popstore",
    storageBucket: "av-popstore.appspot.com",
    messagingSenderId: "1029501298115",
    appId: "1:1029501298115:web:dc804ddfce3e9470f28976"
});

export function getFirebase() {
    return app;
}

export function getFirestore() {
    return firebase.firestore(app);
}