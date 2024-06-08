import React, {useRef, useEffect} from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import CtaSection from './CtaSection'
import FooterComponent from './FooterComponent'
import './App.css'



function App() {
  const scrollIntoCta = useRef(null);

  useEffect(() =>{
    console.log(scrollIntoCta.current)
  },[])

  return (
    <>
      <div className='container'>
        <Navbar/>
        <HeroSection ctaRef ={scrollIntoCta}/>
        <CtaSection ref={scrollIntoCta}/>
        <FooterComponent/>
      </div>
    </>
  )
}

export default App
