import React, { FunctionComponent } from 'react'
import Footer from '../../components/layout/Footer/Footer'
import Header from '../../components/layout/Header/Header'
import NavBar from '../../components/layout/NavBar/NavBar'
import SpeakOut from '../../components/asides/SpeakOut/SpeakOut'
import SubmitName from '../../components/asides/SubmitName/SubmitName'
import PreviousRulings from '../../components/PreviousRulings/PreviousRulings'

const HomePage: FunctionComponent = () => {
  return (
    <div>
      <NavBar />
      <Header />
      <div className="max-centered">
        <SpeakOut />
        <PreviousRulings />
        <SubmitName />
        <Footer />
      </div>
    </div>
  )
}

export default HomePage
