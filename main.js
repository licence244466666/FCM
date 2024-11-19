import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js";

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

// Request permission for notifications
document.getElementById('subscribe').addEventListener('click', () => {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');

      // Get FCM token
      getToken(messaging, { vapidKey: "BK_UUPiZwvmHO_PAkBWBt5VQdpaOPu1e8950c-SXIyBf_vPIYgeWQsg0N9J8Wr3dByV8Ij8lnHksvie0mgbUeV0" })
        .then((currentToken) => {
          if (currentToken) {
            console.log('Token generated:', currentToken);
            document.getElementById('tokenDisplay').innerText = `Token: ${currentToken}`;
          } else {
            console.error('No registration token available.');
          }
        })
        .catch((err) => {
          console.error('An error occurred while retrieving token.', err);
        });
    } else {
      console.error('Notification permission denied.');
    }
  });
});

// Handle foreground messages
onMessage(messaging, (payload) => {
  console.log('Message received in foreground: ', payload);
  alert(`Notification: ${payload.notification.title} - ${payload.notification.body}`);
});
