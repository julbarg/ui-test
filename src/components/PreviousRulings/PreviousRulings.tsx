import { FunctionComponent, useEffect, useState } from 'react'
import './PreviousRulings.scss'
import { Poll } from '../../types/types'
import Cards from './Cards/Cards'
import { getPollsFirebase } from '../../services/firebase/pollService'
import { QuerySnapshot } from '../../services/firebase/firebaseApp'

const PreviousRulings: FunctionComponent = () => {
  const [polls, setPolls] = useState([] as Poll[])

  const callback = (pollSnapshot: QuerySnapshot) => {
    const queryPolls: Poll[] = []
    pollSnapshot.forEach((poll) => {
      queryPolls.push({
        ...poll.data(),
        id: poll.id,
      })
    })

    setPolls(queryPolls)
  }
  const getPolls = () => {
    getPollsFirebase(callback)
  }

  useEffect(() => {
    getPolls()
  }, [])
  return (
    <main role="main" className="previous-rulings">
      <h2 className="previous-rulings__title">Previous Rulings</h2>
      <Cards polls={polls} />
    </main>
  )
}

export default PreviousRulings
