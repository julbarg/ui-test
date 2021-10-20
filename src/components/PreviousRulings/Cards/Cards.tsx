import { FunctionComponent, useContext, useEffect, useState } from 'react'
import useIsMobile from '../../../hooks/useIsMobile'
import { Poll } from '../../../types/types'
import { TypeContext } from '../PreviousRulings'

import Card from './Card/Card'

const Cards: FunctionComponent<{ polls: Poll[] }> = ({ polls }) => {
  const [className, setClassName] = useState('')
  const typeView = useContext(TypeContext)
  const [isMobile] = useIsMobile()

  useEffect(() => {
    if (isMobile) {
      setClassName('cards-mobile')
    } else if (typeView === 'grid') {
      setClassName('cards')
    } else {
      setClassName('')
    }
  }, [typeView, isMobile])

  return (
    <div className={className}>
      {polls.map((poll) => (
        <Card key={poll.id} poll={poll} />
      ))}
    </div>
  )
}

export default Cards
