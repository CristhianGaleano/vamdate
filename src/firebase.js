import firebase from '@firebase/app'

// referencias a las librerias de Aut y BD
require('firebase/auth')
require('firebase/firestore')
require('firebase/storage')
// require('@google-cloud/storage')

var firebaseConfig = {
  apiKey: "AIzaSyB4rBWOH4KJHKUwgzngVrHLdbx1coD2jw8",
  authDomain: "ventanillas-virtuales-ucp.firebaseapp.com",
  databaseURL: "https://ventanillas-virtuales-ucp.firebaseio.com",
  projectId: "ventanillas-virtuales-ucp",
  storageBucket: "ventanillas-virtuales-ucp.appspot.com",
  messagingSenderId: "329733591520",
  appId: "1:329733591520:web:3416b245a7b497eab21b85",
  measurementId: "G-6LNR69JDPN"
};
// var firebaseConfig = {
//     apiKey: "AIzaSyD8iB3LmsMdkmY4PnIHrDY1lxvp55N9xHk",
//     authDomain: "chat-ucp.firebaseapp.com",
//     databaseURL: "https://chat-ucp.firebaseio.com",
//     projectId: "chat-ucp",
//     storageBucket: "chat-ucp.appspot.com",
//     messagingSenderId: "240210462109",
//     appId: "1:240210462109:web:86c5069e720e6b3b459b74"
//   };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // instancias pra aut y bd
  const auth = firebase.auth()
  const db = firebase.firestore()
  const provider = new firebase.auth.GoogleAuthProvider()
  const providerF = new firebase.auth.FacebookAuthProvider();
  const storage = firebase.storage()

  // exportando para poderlas utilizar en los componentes
  export { auth, db, provider, providerF, storage }
