export interface Poll {
  id: string
  name?: string
  description?: string
  category?: string
  picture?: string
  lastUpdated?: LastUpdated
  votes?: Votes
}

export interface Votes {
  positive: number
  negative: number
}

export interface LastUpdated {
  seconds: number
  toMillis: Func
}

interface Func {
  (): number
}
