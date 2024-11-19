// Ensure Firebase is initialized first
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js";

// Your web app's Firebase configuration
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

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

// Register the service worker
navigator.serviceWorker.register('/FCM/FCM/firebase-messaging-sw.js')
  .then((registration) => {
    console.log('Service Worker Registered:', registration);
  })
  .catch((error) => {
    console.error('Error during service worker registration:', error);
  });

// Request the FCM token
document.getElementById('subscribe').addEventListener('click', async () => {
  try {
    // Request permission to send notifications
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log('Notification permission granted.');

      // Get the FCM token
      const token = await getToken(messaging, {
        vapidKey: 'YOUR_VAPID_KEY_HERE' // Replace with your actual VAPID key
      });

      if (token) {
        console.log('FCM Token:', token);
      } else {
        console.log('No FCM token received');
      }
    } else {
      console.log('Notification permission denied');
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
  }
});
