import { LastUpdated } from '../types/types'

export const getLabelDifferenceDates = (
  lastUpdated: LastUpdated,
  category: string
): string => {
  let message = 'days'
  const today = new Date()
  const lastUpdatedR = new Date(lastUpdated.toMillis())
  let difference =
    (today.getTime() - lastUpdatedR.getTime()) / (1000 * 3600 * 24)
  message = difference > 1 ? 'days' : 'day'

  if (difference > 31) {
    difference = monthDiff(lastUpdatedR, today)
    message = 'months'
    message = difference > 1 ? 'months' : 'month'

    if (difference > 12) {
      difference = Math.round(yearsDiff(lastUpdatedR, today))
      message = difference > 1 ? 'years' : 'year'
    }
  }

  return `${Math.round(difference)} ${message} ago in ${category}`
}

const monthDiff = (d1: Date, d2: Date) => {
  let months
  months = (d2.getFullYear() - d1.getFullYear()) * 12
  months -= d1.getMonth()
  months += d2.getMonth()
  return months <= 0 ? 0 : months
}

const yearsDiff = (d1: Date, d2: Date) => {
  const yearsDiff = d2.getFullYear() - d1.getFullYear()
  return yearsDiff
}
