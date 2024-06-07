import { useState } from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import CtaSection from './CtaSection'
import FooterComponent from './FooterComponent'
import './App.css'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container'>
        <Navbar/>
        <HeroSection/>
        <CtaSection/>
        <FooterComponent/>
      </div>
    </>
  )
}

export default App
