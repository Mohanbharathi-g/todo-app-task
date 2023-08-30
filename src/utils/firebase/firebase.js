
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyAX5TdoWOoLBG4cj92pajaBwuNQJz1NBTw",
  authDomain: "todo-app-5fc29.firebaseapp.com",
  projectId: "todo-app-5fc29",
  storageBucket: "todo-app-5fc29.appspot.com",
  messagingSenderId: "946183012487",
  appId: "1:946183012487:web:957bdd8fd5f822655c7822"
};


const app = initializeApp(firebaseConfig);

const db=getFirestore(app)

export {db}


