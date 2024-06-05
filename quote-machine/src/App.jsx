import { useState } from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container'>
        <Navbar/>
        <HeroSection/>
      </div>
    </>
  )
}

export default App
