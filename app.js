// Firebase Configurations
var firebaseConfig = {
    apiKey: "AIzaSyCYDhCeKKpnjD8wXaeUjCec-EwUVU8A_1A",
    authDomain: "light-sharescreen.firebaseapp.com",
    databaseURL: "https://light-sharescreen.firebaseio.com",
    projectId: "light-sharescreen",
    storageBucket: "light-sharescreen.appspot.com",
    messagingSenderId: "792490220923",
    appId: "1:792490220923:web:e907d10ec51cdbbdb8b1de"
};
// Initializing Firebase App
firebase.initializeApp(firebaseConfig);

// Initializing Cloud Messanging
const messaging = firebase.messaging();


// Registering Service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(res => {
        console.log("Register Success");
        messaging.useServiceWorker(res);
    }).catch(e => {
        console.log(e);
    });
}

// Subscribing to push Notifications
const subscribe = () => {
    const token = document.getElementById('token');
    // getting PushNotification permission from browser
    Notification.requestPermission().then(permission => {
        if (permission == "granted") {
            // if Permission is allowed then getting firebase messanging token from firebase
            messaging.getToken().then(currentToken => {
                console.log(currentToken);
                // displaying token in index file
                token.textContent = currentToken;
            });
        } else {
            token.textContent = "Permission not granted";
        }
    }).catch(e=>{
        token.textContent=e;
    });
};


// Sending Push Notifications
const sendPush = () => {
    // Getting From Data when button clicked
    const token = document.getElementById('usertoken').value;
    const notificationTitle = document.getElementById('title').value;
    const notificationBody = document.getElementById('body').value;

    // Adding data to payload for sending push notifications
    let body = {
        to: token,
        notification: {
            title: notificationTitle,
            body: notificationBody,
            click_action: "/",
        }
    };

    // Setting options for push notification
    const options = {
        method: "POST",
        headers: new Headers({
            // Add your server key after key=
            Authorization: "key=AAAAuIQZHXs:APA91bF6OzMEeWl7aP0DSgGdZDIvR6JSjhvigHSF9Tb5dxmXP_-5TwhlhHqgcol0H8r6EbZRL0Mfp8eDT65S6YYH1shZiviwzFhZnJGlaDYL42rjqeBnWBEdtT9tJzl_CZ4U1HLevIsT",
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(body)
    };

    // Sending Push notifications to user using fetch api
    fetch("https://fcm.googleapis.com/fcm/send", options)
        .then(res => res.json())
        .then(data => {
            if (data.failure == 1) {
                alert("Token Expire");
            } else {
                alert("Send Success");
            }
        })
        .catch(err => {
            alert(err);
        });
};