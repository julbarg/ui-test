import { FunctionComponent, useContext, useEffect, useState } from 'react'
import {
  incrementNegativePollById,
  incrementPositivePollById,
} from '../../../../services/firebase/pollService'
import { Poll } from '../../../../types/types'
import { getLabelDifferenceDates } from '../../../../util/DateUtil'
import { TypeContext } from '../../PreviousRulings'

const CardActions: FunctionComponent<{ poll: Poll }> = ({ poll }) => {
  const [days, setDays] = useState('')
  const [voteUp, setVoteUp] = useState(false)
  const [voteDown, setVoteDown] = useState(false)
  const [voteNow, setVoteNow] = useState(false)
  const [classNameInit, setClassNameInit] = useState('')
  const [isVoted, setIsVoted] = useState(false)
  const typeView = useContext(TypeContext)

  useEffect(() => {
    if (typeView === 'grid') {
      setClassNameInit('card-grid')
    } else {
      setClassNameInit('card')
    }
  }, [typeView])

  useEffect(() => {
    calculateDays()
  }, [poll.lastUpdated])

  const calculateDays = () => {
    if (poll.lastUpdated) {
      setDays(getLabelDifferenceDates(poll.lastUpdated, poll.category || ''))
    }
  }

  const vote = () => {
    if (voteUp) {
      incrementPositivePollById(poll.id)
    } else if (voteDown) {
      incrementNegativePollById(poll.id)
    }
  }

  return (
    <div className={`${classNameInit}__actions`}>
      <div className={`${classNameInit}__actions--date`}>
        {isVoted ? 'Thank you for your vote!' : days}
      </div>
      <div className={`${classNameInit}__actions--vote`}>
        {!isVoted && (
          <>
            <button
              className={`${classNameInit}__actions--vote-positive ${
                voteUp ? 'selected' : ''
              }`}
              aria-label="thumbs up"
              onClick={() => {
                setVoteUp(true)
                setVoteDown(false)
                setVoteNow(true)
              }}
            >
              <img src="./assets/img/thumbs-up.svg" alt="thumbs up" />
            </button>
            <button
              className={`${classNameInit}__actions--vote-negative ${
                voteDown ? 'selected' : ''
              }`}
              aria-label="thumbs down"
              onClick={() => {
                setVoteUp(false)
                setVoteDown(true)
                setVoteNow(true)
              }}
            >
              <img src="./assets/img/thumbs-down.svg" alt="thumbs down" />
            </button>{' '}
          </>
        )}
        <button
          className={`${classNameInit}__actions--vote-now`}
          disabled={!voteNow}
          onClick={() => {
            if (isVoted) {
              setIsVoted(false)
              setVoteUp(false)
              setVoteDown(false)
              setVoteNow(false)
            } else {
              vote()
              setIsVoted(true)
            }
          }}
        >
          {isVoted ? 'Vote Again' : 'Vote Now'}
        </button>
      </div>
    </div>
  )
}

export default CardActions
