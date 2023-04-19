import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATIwntnaOrOvP5SU3Bio03QxFnUxMsNL4",
  authDomain: "fir-125-reports.firebaseapp.com",
  projectId: "fir-125-reports",
  storageBucket: "fir-125-reports.appspot.com",
  messagingSenderId: "914975653054",
  appId: "1:914975653054:web:242aee469dcf80d55c72ef"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;