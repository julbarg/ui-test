import { FunctionComponent, useEffect, useState } from 'react'
import {
  incrementNegativePollById,
  incrementPositivePollById,
} from '../../../../services/firebase/pollService'
import { Poll } from '../../../../types/types'
import { getLabelDifferenceDates } from '../../../../util/DateUtil'

const CardActions: FunctionComponent<{ poll: Poll }> = ({ poll }) => {
  const [days, setDays] = useState('')
  const [voteUp, setVoteUp] = useState(false)
  const [voteDown, setVoteDown] = useState(false)
  const [voteNow, setVoteNow] = useState(false)

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
    <div className="card__actions">
      <div className="card__actions--date">{days}</div>
      <div className="card__actions--vote">
        <button
          className={`card__actions--vote-positive ${voteUp ? 'selected' : ''}`}
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
          className={`card__actions--vote-negative ${
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
        </button>
        <button
          className="card__actions--vote-now"
          disabled={!voteNow}
          onClick={vote}
        >
          Vote Now
        </button>
      </div>
    </div>
  )
}

export default CardActions
