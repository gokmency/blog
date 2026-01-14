import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
// Analytics'i şimdilik kapattım, kafa karıştırmasın, önce veritabanı çalışsın.

// DİKKAT: Buraya senin anahtarlarını elle yazdık (Hardcode)
const firebaseConfig = {
  apiKey: "AIzaSyDYFokbwPY-ZNvUlVEQ3zNAbG-UdQVGVkc",
  authDomain: "gokmensblog.firebaseapp.com",
  projectId: "gokmensblog",
  storageBucket: "gokmensblog.firebasestorage.app",
  messagingSenderId: "828603398406",
  appId: "1:828603398406:web:92faeeedf43134eabf0687",
  measurementId: "G-EG5935XNCM"
};

// Initialize Firebase
let app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore
const db: Firestore = getFirestore(app);

// Sadece db ve app'i dışarı aktaralım şimdilik
export { app, db };
