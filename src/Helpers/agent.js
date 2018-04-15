import React from 'react';
import history from './history';

var Firebase = require('firebase');

Firebase.initializeApp({
    apiKey: "AIzaSyCTZX0lG1JyIBUphH7m5SDoPCpRamPNm24",
    authDomain: "journeyapp91.firebaseapp.com",
    databaseURL: "https://journeyapp91.firebaseio.com",
    projectId: "journeyapp91",
    storageBucket: "journeyapp91.appspot.com",
    messagingSenderId: "515548202082"
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

const common = {
    beautifulUnsplash: () => {
        return dispatch => {
            console.log('im in here!')
            const URL = "https://api.unsplash.com/photos/random?client_id=17d1aeb4a5d48238dd727a19feff53cc3cdd55c8160f3a48364eb4cb879c6722&collections=142324,369,1278105,536176";
            return fetch(URL, {method: 'GET'})
                .then(response => Promise.all([response, response.json()])).then(([response, json]) => {
                    if (response.status === 200) {

                        dispatch({
                            type: 'BEAUTIFUL_UNSPLASH',
                            value: json.urls.regular});

                    }
                    else {
                        console.log('oh no')
                    }
                });
        }

    },
};



const FirebaseQuery = {
    liveJourney: (journey_id) => {
        return dispatch => {
            console.log('GET_LIVE_JOURNEY');
            // new Promise(function (resolve, reject) {
            database.ref('live_journeys/' + journey_id).on('value', (snapshot) => {
                console.log('new snapshot');
                console.log(snapshot.val());
                if (snapshot.val() !== null) {
                    // resolve(snapshot.val());
                    let sortable = [];

                    for (let uid in snapshot.val()) {
                        let temp = snapshot.val();
                        temp[uid].uid = uid;
                        if (temp[uid].dataUploaded === true) {
                            sortable.push(temp[uid]);
                        }
                    }

                    sortable.sort(function (a, b) {
                        return a.timestamp - b.timestamp
                    });
                    console.log(sortable);
                    dispatch({
                        type: 'LIVE_JOURNEY_META',
                        liveJourneyMeta: sortable,
                        journeyId: journey_id,
                        journeyLength: sortable.length
                    });

                }
            })
            ;
        };
    },
    sendChat: (journey_id, message, member) => {
        console.log('SEND_CHAT');
        database.ref('messages/' + journey_id).push({
            name: member,
            message: message,
            timestamp: Firebase.database.ServerValue.TIMESTAMP
        })
        ;
    },
    chatListener: (journey_id) => {
        console.log('CHAT_LISTENER');
        var ignoreItems = true;

        return dispatch => {
            database.ref('messages/' + journey_id).on('child_added', (snapshot) => {
                if (!ignoreItems) {
                    console.log('new Chatlistener Snapshot');
                    console.log(snapshot.val());
                    dispatch({
                        type: 'CHAT_CHILD_ADDED',
                        message: snapshot.val()
                    })

                }

            });
            database.ref('messages/' + journey_id).once('value', (snapshot) => {
                console.log('Initial ChatListener Load');
                console.log(snapshot.val())
                ignoreItems = false;

                let chatSortable = [];

                for (let message in snapshot.val()) {
                    let temp = snapshot.val();
                    chatSortable.push(temp[message]);
                }

                chatSortable.sort(function (a, b) {
                    return a.timestamp - b.timestamp
                });

                console.log(chatSortable);


                dispatch({
                    type: 'CHAT_INITIAL_LOAD',
                    messages: chatSortable
                })

            });

        };
    },



    campaignMeta: (campaign) => {
        return dispatch => {
            console.log('campaignMeta called');
            database.ref('campaigns/' + campaign).on('value', (snapshot) => {
                if (snapshot.val() !== null) {
                    dispatch({
                        type: 'CAMPAIGN_META',
                        campaign: campaign,
                        campaignMeta: snapshot.val()
                    })
                }
                return (snapshot.val());
            });
        }
    },

}


export default {
    Auth,
    FirebaseQuery,
    common,
    authService
};
