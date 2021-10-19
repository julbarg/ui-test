import React, { FunctionComponent } from 'react'
import { render } from 'react-dom'
import HomePage from './views/HomePage/HomePage'

const App: FunctionComponent = () => {
  return <HomePage />
}

render(<App />, document.getElementById('root'))
