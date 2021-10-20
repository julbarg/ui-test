import { createContext, FunctionComponent, useEffect, useState } from 'react'
import './PreviousRulings.scss'
import { Poll } from '../../types/types'
import Cards from './Cards/Cards'
import { getPollsFirebase } from '../../services/firebase/pollService'
import { QuerySnapshot } from '../../services/firebase/firebaseApp'
import useIsMobile from '../../hooks/useIsMobile'

export const TypeContext = createContext('')

const PreviousRulings: FunctionComponent = () => {
  const [polls, setPolls] = useState([] as Poll[])
  const [typeView, setTypeView] = useState('list')
  const [isMobile] = useIsMobile()

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

  useEffect(() => {
    if (isMobile) {
      setTypeView('grid')
    }
  }, [isMobile])

  return (
    <TypeContext.Provider value={typeView}>
      <main role="main" className="previous-rulings">
        <header className="previous-rulings__header">
          <h2 className="previous-rulings__title">Previous Rulings</h2>
          {!isMobile && (
            <select
              id="view"
              value={typeView}
              onChange={(e) => setTypeView(e.target.value)}
              onBlur={(e) => setTypeView(e.target.value)}
            >
              <option key="list" value="list">
                List
              </option>
              <option key="grid" value="grid">
                Grid
              </option>
            </select>
          )}
        </header>

        <Cards polls={polls} />
      </main>
    </TypeContext.Provider>
  )
}

export default PreviousRulings
