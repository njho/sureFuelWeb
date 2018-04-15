import React from 'react';
import history from './history';

var Firebase = require('firebase');

Firebase.initializeApp({
    apiKey: "AIzaSyC5X5Uu3_T3Ocm1fjmLVJMVbxLA-6OGtek",
    authDomain: "surefuel-1da8b.firebaseapp.com",
    databaseURL: "https://surefuel-1da8b.firebaseio.com",
    projectId: "surefuel-1da8b",
    storageBucket: "surefuel-1da8b.appspot.com",
    messagingSenderId: "89712255365"
});

var authService = Firebase.auth();
var database = Firebase.database();

let token = null;

const Auth = {
    current: () => {
        return new Promise(function (resolve, reject) {
            authService.onAuthStateChanged(function (user) {
                if (user) {
                    resolve(user);
                } else {
                    history.push('/');
                    reject('There was an error bish');
                }
            })
        })
    },
    login: (email, password) => {
        return authService.signInWithEmailAndPassword(email, password);
    },
    register: (email, password) => {
        return authService.createUserWithEmailAndPassword(email, password);
    },
    assignConsole: (uid) => {
        return database.ref('users/' + uid).push();
    },
    lookupConsole: (uid) => {
        return database.ref('users/' + uid).once('value');
    },
    lookupConsole2: (uid) => {
        return dispatch => {
            var consoleWatch = database.ref('users/' + uid);
            consoleWatch.on('value', function (snapshot) {
                /*
                 console.log(snapshot.val());
                 */

                dispatch(FirebaseQuery.fetchConsole(snapshot.val()))
            });
        }
    },
    logout: () => {
        authService.signOut();
    }
};


const FirebaseQuery = {
    locationListener: () => {
        console.log('LOCATION_LISTENER');

        return dispatch => {
            database.ref('test/coordinates').on('value', (snapshot) => {
                console.log(snapshot.val())
                dispatch({
                    type: 'LOCATION_UPDATE',
                    value: snapshot.val()
                })
            });

        };
    },
    getOptimizedRoute: () => {
        console.log('GET_OPTIMIZED_ROUTE');

        return dispatch => {
            return fetch('https://us-central1-surefuel-1da8b.cloudfunctions.net/getRoute', {method: 'GET'})
                .then(response => Promise.all([response, response.json()])).then(([response, json]) => {
                    if (response.status === 200) {
                        console.log(json);
                        console.log(response);
                        dispatch({
                            type: 'OPTIMIZED_ROUTES',
                            value: json
                        });

                    }
                    else {
                        console.log('oh no')
                    }
                });

        };
    },

}


export default {
    Auth,
    FirebaseQuery,
    authService
};
