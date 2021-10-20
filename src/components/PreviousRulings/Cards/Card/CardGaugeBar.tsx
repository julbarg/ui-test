import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { TypeContext } from '../../PreviousRulings'

const CardGaugeCard: FunctionComponent<{ positive: number; negative: number }> =
  ({ positive, negative }) => {
    const [classNameInit, setClassNameInit] = useState('')
    const typeView = useContext(TypeContext)

    useEffect(() => {
      if (typeView === 'grid') {
        setClassNameInit('card-grid')
      } else {
        setClassNameInit('card')
      }
    }, [typeView])

    return (
      <div className={`${classNameInit}__gauge-bar`}>
        <div
          className="card__gauge-bar-positive"
          style={{ width: `${positive}%` }}
        >
          <img src="./assets/img/thumbs-up.svg" alt="thumbs up" />
          <span>{positive}%</span>
        </div>
        <div
          className="card__gauge-bar-negative"
          style={{ width: `${negative}%` }}
        >
          <span>{negative}%</span>
          <img src="./assets/img/thumbs-down.svg" alt="thumbs down" />
        </div>
      </div>
    )
  }

export default CardGaugeCard
