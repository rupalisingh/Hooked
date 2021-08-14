import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'



firebase.initializeApp(
    {
        apiKey: "AIzaSyAhX5jhX_tFUsupAWt22fxDvDHaVHQZp9E",
        authDomain: "hooked-60329.firebaseapp.com",
        projectId: "hooked-60329",
        storageBucket: "hooked-60329.appspot.com",
        messagingSenderId: "827944509735",
        appId: "1:827944509735:web:f70560667694da5beac902",
        measurementId: "G-DXV9BLMZX9"
      }
)

export const auth = firebase.auth()
const firestore = firebase.firestore()
export const database = {
  // entities to export which will be used later
  users : firestore.collection('users'),
  posts : firestore.collection('posts'),
  getCurrentTimestamp : firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage()