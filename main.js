// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBB5SvT1nvmUxR2E26pfcJ9yBzpL0VfBBM",
  authDomain: "wordpress-7d715.firebaseapp.com",
  projectId: "wordpress-7d715",
  storageBucket: "wordpress-7d715.firebasestorage.app",
  messagingSenderId: "825792468964",
  appId: "1:825792468964:web:02e8183833e34424f699f1",
  measurementId: "G-HCB0DYTB59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Register the Service Worker
navigator.serviceWorker
  .register('/FCM/firebase-messaging-sw.js') // Correct path for GitHub Pages
  .then((registration) => {
    console.log('Service Worker registered:', registration);

    // Get FCM Token
    return getToken(messaging, {
      vapidKey: "BK_UUPiZwvmHO_PAkBWBt5VQdpaOPu1e8950c-SXIyBf_vPIYgeWQsg0N9J8Wr3dByV8Ij8lnHksvie0mgbUeV0", // Your VAPID Key
      serviceWorkerRegistration: registration,
    });
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log('FCM Token:', currentToken);

      // Display the token (optional)
      const tokenElement = document.getElementById('tokenDisplay');
      if (tokenElement) {
        tokenElement.innerText = `FCM Token: ${currentToken}`;
      }
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  })
  .catch((error) => {
    console.error('Error retrieving token:', error);
  });

// Listen for messages when the app is in the foreground
onMessage(messaging, (payload) => {
  console.log('Message received in foreground:', payload);

  // Optionally, show a notification
  if (Notification.permission === 'granted') {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon || '/FCM/firebase-logo.png', // Use your logo path here
    };

    new Notification(notificationTitle, notificationOptions);
  }
});

// Request Notification Permission
if (Notification.permission !== 'granted') {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      console.log('Notification permission denied.');
    }
  });
} else {
  console.log('Notification permission already granted.');
}
