import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREAPIKEY,
  authDomain: process.env.REACT_APP_FIREDOMAIN,
  projectId: process.env.REACT_APP_FIREID,
  storageBucket: process.env.REACT_APP_FIRESTORAGE,
  messagingSenderId: process.env.REACT_APP_FIRESENDERID,
  appId: process.env.REACT_APP_FIREAPPID,
  //measurementId: process.env.REACT_APP_FIREMEASUREMENT
}




const app = initializeApp(firebaseConfig);
export const imageStorage = getStorage(app)