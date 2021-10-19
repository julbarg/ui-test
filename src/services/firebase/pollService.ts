import firebaseApp, { QuerySnapshot, firestore } from './firebaseApp'

export const getPollsFirebase = (
  callback: (snapshot: QuerySnapshot) => void
): void => {
  firebaseApp.collection('polls').onSnapshot(callback, (error) => {
    console.error(error)
  })
}

export const incrementPositivePollById = (id: string): void => {
  const increment = firestore.FieldValue.increment(1)
  const doc = firebaseApp.collection('polls').doc(id)

  doc.update({ 'votes.positive': increment })
}

export const incrementNegativePollById = (id: string): void => {
  const increment = firestore.FieldValue.increment(1)
  const doc = firebaseApp.collection('polls').doc(id)

  doc.update({ 'votes.negative': increment })
}
