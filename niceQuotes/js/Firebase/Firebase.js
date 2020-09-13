import firebase from 'firebase';
import 'firebase/firestore';

import { firebaseConfig } from "./firebaseConfig";

const config = firebaseConfig;

export default class Firebase {

    static db;

    static init() {
        console.log(`${config}`);
        if (firebase.apps.length === 0) { // wenn Verbindung noch nicht besteht, dann stelle sie her
            firebase.initializeApp(config); // App heißt eigtl Verbindung
        }
        Firebase.db = firebase.firestore();
    }
}

// initialisierung mit:
// Firebase.init()