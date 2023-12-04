import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBt8GR0PniqulvoMjliS6a_64amdXrrB_0",
  authDomain: "storage-fundit.firebaseapp.com",
  projectId: "storage-fundit",
  storageBucket: "storage-fundit.appspot.com",
  messagingSenderId: "63584507641",
  appId: "1:63584507641:web:72fec2835655562345b428"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)