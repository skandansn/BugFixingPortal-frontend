
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSpsyP_PhyDMEO50XQvbPep7dnCRtXg-s",
  authDomain: "bugfixingportal.firebaseapp.com",
  projectId: "bugfixingportal",
  storageBucket: "bugfixingportal.appspot.com",
  messagingSenderId: "29509942340",
  appId: "1:29509942340:web:fb2c432d349acaf63d5011"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export { storage,firebaseApp };