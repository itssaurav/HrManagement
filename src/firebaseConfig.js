import * as firebase from 'firebase'
let config = {
    apiKey: "AIzaSyA1J2nenoSCKdviMxUt_C0eopEtXkAgxwA",
    authDomain: "hrmanagement-3c15c.firebaseapp.com",
    databaseURL: "https://hrmanagement-3c15c.firebaseio.com",
    projectId: "hrmanagement-3c15c",
    storageBucket: "hrmanagement-3c15c.appspot.com",
    messagingSenderId: "917739662883"
};
let fireBaseInitialize = firebase.initializeApp(config);
export default fireBaseInitialize;