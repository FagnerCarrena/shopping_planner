import{initializeApp} from 'firebase/app'
import{getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDRSHKUAaNPTczsU-mUoZ8_yck4NB03Chc",
    authDomain: "curso-605ec.firebaseapp.com",
    projectId: "curso-605ec",
    storageBucket: "curso-605ec.appspot.com",
    messagingSenderId: "470497068301",
    appId: "1:470497068301:web:80e15c6444288c2e7ddc44",
    measurementId: "G-P6RPEEMWEX"
  };

  const firebaseapp = initializeApp(firebaseConfig)
  const db = getFirestore(firebaseapp)
  const auth = getAuth(firebaseapp)
  export{db, auth};