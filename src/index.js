import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from "firebase/app";
import { firebaseConfig as FirebaseConfig } from "./firebase.config";

async function FirebaseSetup() {
        // Wait till Firebase Load Complete before Firing
        function getCurrentUser(auth) {
                return new Promise((resolve, reject) => {
                        const unsubscribe = auth.onAuthStateChanged(user => {
                                unsubscribe();
                                resolve(user);
                        }, reject);
                });
        }
        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: https://bit.ly/CRA-PWA
        serviceWorker.register();

        firebase.initializeApp(FirebaseConfig);
        await getCurrentUser(firebase.auth());
        const user = firebase.auth().currentUser;
        // No One Is Signed In
        if (user == null)
                return;
}

FirebaseSetup().then(async () => {
        ReactDOM.render(<App />, document.getElementById('root'));
})
