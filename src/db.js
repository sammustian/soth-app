import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: 'soth-app' })
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
export const { TimeStamp, GeoPoint } = firebase.firestore

