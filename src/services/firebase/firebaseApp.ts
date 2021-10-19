import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAD2MQa3SfyS-azbnJBQUzcd6SF_Li4X2M',
  authDomain: 'ui-test-7a5e4.firebaseapp.com',
  projectId: 'ui-test-7a5e4',
  storageBucket: 'ui-test-7a5e4.appspot.com',
  messagingSenderId: '275991401550',
  appId: '1:275991401550:web:a6c61aeaa09220cf63df1f',
  measurementId: 'G-MS9C8LN6VK',
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
firebase.analytics(app)
export const firestore = firebase.firestore
export type QuerySnapshot =
  firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>

export default app.firestore()
