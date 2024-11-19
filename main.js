import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js";

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

// Register the service worker
navigator.serviceWorker
  .register('/firebase-messaging-sw.js') // Ensure this path matches your GitHub Pages setup
  .then((registration) => {
    console.log('Service worker registered:', registration);
    // Get FCM token
    return getToken(messaging, {
      vapidKey: "BK_UUPiZwvmHO_PAkBWBt5VQdpaOPu1e8950c-SXIyBf_vPIYgeWQsg0N9J8Wr3dByV8Ij8lnHksvie0mgbUeV0", // Your VAPID key
      serviceWorkerRegistration: registration,
    });
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log('FCM Token:', currentToken);
      document.getElementById('tokenDisplay').innerText = `Token: ${currentToken}`;
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  })
  .catch((err) => {
    console.error('Error while retrieving token:', err);
  });
