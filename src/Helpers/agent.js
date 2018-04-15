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
    FirebaseQuery,
    authService
};
