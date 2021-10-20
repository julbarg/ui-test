import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { Poll } from '../../../../types/types'
import { roundAndFixed } from '../../../../util/NumberUtil'
import { TypeContext } from '../../PreviousRulings'
import CardActions from './CardAction'
import CardGaugeCard from './CardGaugeBar'

const Card: FunctionComponent<{ poll: Poll }> = ({ poll }) => {
  const [positive, setPositive] = useState(0)
  const [negative, setNegative] = useState(0)
  const [enhancedDescription, setEnhancedDescription] = useState('')
  const [enhancedName, setEnhancedName] = useState('')
  const [enhancedPicture, setEnhancedPicture] = useState('')
  const [enhancedRectangle, setEnhancedRectangle] = useState('')
  const [classNameInit, setClassNameInit] = useState('')
  const [lengthName, setLengthName] = useState(0)
  const typeView = useContext(TypeContext)

  useEffect(() => {
    if (typeView === 'grid') {
      setClassNameInit('card-grid')
      setLengthName(15)
      setEnhancedPicture(`${poll.picture}-large.png`)
      setEnhancedRectangle('rectangle-large.png')
    } else {
      setClassNameInit('card')
      setLengthName(25)
      setEnhancedPicture(`${poll.picture}.png`)
      setEnhancedRectangle('rectangle.png')
    }
  }, [typeView])

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

  useEffect(() => {
    const truncateName =
      poll.name && poll.name.length <= lengthName
        ? poll.name
        : poll.name?.substr(0, lengthName) + '\u2026'

    setEnhancedName(truncateName)
  }, [poll.name, lengthName])

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
          src={`./assets/img/${enhancedPicture}`}
          alt=""
          className={`${classNameInit}__image`}
        />
        <img
          src={`./assets/img/${enhancedRectangle}`}
          alt=""
          className={`${classNameInit}__bg`}
        />
      </>
    )
  }

  const renderThumb = () => {
    return positive >= negative ? renderThumsUp() : renderThumsDown()
  }

  const renderThumsDown = () => {
    return (
      <div
        className={`${classNameInit}__icon-result yellow`}
        aria-label="thumbs down"
      >
        <img src="./assets/img/thumbs-down.svg" alt="thumbs down" />
      </div>
    )
  }

  const renderThumsUp = () => {
    return (
      <div
        className={`${classNameInit}__icon-result green`}
        aria-label="thumbs up"
      >
        <img src="./assets/img/thumbs-up.svg" alt="thumbs up" />
      </div>
    )
  }

  const renderTitle = () => {
    return (
      <div className={`${classNameInit}__title`}>
        <h3>{enhancedName}</h3>
        <p>{enhancedDescription}</p>
      </div>
    )
  }

  return (
    <div className={`${classNameInit}`}>
      {renderBackground()}
      {renderThumb()}
      {renderTitle()}
      <CardGaugeCard positive={positive} negative={negative} />
      <CardActions poll={poll} />
    </div>
  )
}

export default Card
