import { FunctionComponent, useEffect, useState } from 'react'
import { Poll } from '../../../../types/types'
import { roundAndFixed } from '../../../../util/NumberUtil'
import CardActions from './CardAction'
import CardGaugeCard from './CardGaugeBar'

const Card: FunctionComponent<{ poll: Poll }> = ({ poll }) => {
  const [positive, setPositive] = useState(0)
  const [negative, setNegative] = useState(0)
  const [enhancedDescription, setEnhancedDescription] = useState('')

  useEffect(() => {
    calculatePercentages()
  }, [poll.votes])

  useEffect(() => {
    const truncateDescription =
      poll.description && poll.description.length <= 100
        ? poll.description
        : poll.description?.substr(0, 100) + '\u2026'

    setEnhancedDescription(truncateDescription)
  }, [poll.description])

  const calculatePercentages = () => {
    const { votes } = poll

    if (votes) {
      const total = votes.positive + votes.negative
      const roundPositive = roundAndFixed((votes.positive / total) * 100)
      const roundNegative = roundAndFixed((votes.negative / total) * 100)

      setPositive(roundPositive)
      setNegative(roundNegative)
    }
  }

  const renderBackground = () => {
    return (
      <>
        <img
          src={`./assets/img/${poll.picture}`}
          alt=""
          className="card__image"
        />
        <img src={`./assets/img/rectangle.png`} alt="" className="card__bg" />
      </>
    )
  }

  const renderThumb = () => {
    return positive >= negative ? renderThumsUp() : renderThumsDown()
  }

  const renderThumsDown = () => {
    return (
      <div className="card__icon-result yellow" aria-label="thumbs down">
        <img src="./assets/img/thumbs-down.svg" alt="thumbs down" />
      </div>
    )
  }

  const renderThumsUp = () => {
    return (
      <div className="card__icon-result green" aria-label="thumbs up">
        <img src="./assets/img/thumbs-up.svg" alt="thumbs up" />
      </div>
    )
  }

  const renderTitle = () => {
    return (
      <div className="card__title">
        <h3>{poll.name}</h3>
        <p>{enhancedDescription}</p>
      </div>
    )
  }

  return (
    <div className="card">
      {renderBackground()}
      {renderThumb()}
      {renderTitle()}
      <CardGaugeCard positive={positive} negative={negative} />
      <CardActions poll={poll} />
    </div>
  )
}

export default Card
