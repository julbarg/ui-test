import { FunctionComponent } from 'react'

const CardGaugeCard: FunctionComponent<{ positive: number; negative: number }> =
  ({ positive, negative }) => {
    return (
      <div className="card__gauge-bar">
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
