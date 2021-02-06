import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyDy4KJY6eY44_Zhk_QYruk-lsqPADuppng",
  authDomain: "snapchat-clone-f8545.firebaseapp.com",
  projectId: "snapchat-clone-f8545",
  storageBucket: "snapchat-clone-f8545.appspot.com",
  messagingSenderId: "601946657925",
  appId: "1:601946657925:web:50770ddd5951678a5f45ec",
  measurementId: "G-4NH66918C2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export {db,auth,storage,provider};