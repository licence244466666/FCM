// Import Firebase modules
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

// Function to handle subscription
const subscribeToNotifications = () => {
  console.log("Subscribe button clicked.");

  // Check if notification permissions are granted
  if (Notification.permission === "granted") {
    console.log("Notification permission already granted.");
    registerServiceWorkerAndGetToken();
  } else if (Notification.permission === "default") {
    // Request notification permission
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        registerServiceWorkerAndGetToken();
      } else {
        console.log("Notification permission denied.");
      }
    });
  } else {
    console.log("Notifications are blocked. Please enable them in your browser settings.");
  }
};

// Function to register the Service Worker and get FCM token
const registerServiceWorkerAndGetToken = () => {
  navigator.serviceWorker
    .register('/FCM/FCM/firebase-messaging-sw.js') // Ensure this path is correct for GitHub Pages
    .then((registration) => {
      console.log("Service Worker registered:", registration);

      // Request FCM Token
      return getToken(messaging, {
        vapidKey: "BK_UUPiZwvmHO_PAkBWBt5VQdpaOPu1e8950c-SXIyBf_vPIYgeWQsg0N9J8Wr3dByV8Ij8lnHksvie0mgbUeV0",
        serviceWorkerRegistration: registration,
      });
    })
    .then((currentToken) => {
      if (currentToken) {
        console.log("FCM Token:", currentToken);

        // Display the token in the UI (optional)
        const tokenDisplayElement = document.getElementById("tokenDisplay");
        if (tokenDisplayElement) {
          tokenDisplayElement.innerText = `FCM Token: ${currentToken}`;
        }
      } else {
        console.log("No registration token available. Request permission to generate one.");
      }
    })
    .catch((error) => {
      console.error("Error retrieving token:", error);
    });
};

// Listen for foreground messages
onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);

  // Optionally show notification in the browser
  if (Notification.permission === "granted") {
    const notificationTitle = payload.notification.title || "New Notification";
    const notificationOptions = {
      body: payload.notification.body || "You have a new message.",
      icon: payload.notification.icon || "/FCM/firebase-logo.png", // Adjust to your logo
    };

    new Notification(notificationTitle, notificationOptions);
  }
});

// Add event listener to the "Subscribe" button after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const subscribeButton = document.getElementById("subscribe");
  if (subscribeButton) {
    subscribeButton.addEventListener("click", subscribeToNotifications);
  } else {
    console.log('Subscribe button not found!');
  }
});
