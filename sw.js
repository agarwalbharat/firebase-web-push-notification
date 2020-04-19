importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');
var firebaseConfig = {
    apiKey: "AIzaSyCYDhCeKKpnjD8wXaeUjCec-EwUVU8A_1A",
    authDomain: "light-sharescreen.firebaseapp.com",
    databaseURL: "https://light-sharescreen.firebaseio.com",
    projectId: "light-sharescreen",
    storageBucket: "light-sharescreen.appspot.com",
    messagingSenderId: "792490220923",
    appId: "1:792490220923:web:e907d10ec51cdbbdb8b1de"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();