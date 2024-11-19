importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js');

// Firebase configuration (same as in main.js)
firebase.initializeApp({
  apiKey: "AIzaSyBB5SvT1nvmUxR2E26pfcJ9yBzpL0VfBBM",
  authDomain: "wordpress-7d715.firebaseapp.com",
  projectId: "wordpress-7d715",
  storageBucket: "wordpress-7d715.firebasestorage.app",
  messagingSenderId: "825792468964",
  appId: "1:825792468964:web:02e8183833e34424f699f1",
  measurementId: "G-HCB0DYTB59"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);

  const notificationTitle = payload.notification.title || "New Notification";
  const notificationOptions = {
    body: payload.notification.body || "You have a new message.",
    icon: payload.notification.icon || "/FCM/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
