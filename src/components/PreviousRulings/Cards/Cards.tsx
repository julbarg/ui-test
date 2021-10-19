import { FunctionComponent } from 'react'
import { Poll } from '../../../types/types'
import Card from './Card/Card'

const Cards: FunctionComponent<{ polls: Poll[] }> = ({ polls }) => (
  <>
    {polls.map((poll) => (
      <Card key={poll.id} poll={poll} />
    ))}
  </>
)

export default Cards
