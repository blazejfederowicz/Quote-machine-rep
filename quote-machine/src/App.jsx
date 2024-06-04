import { useState } from 'react'
import Navbar from './Navbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container'>
        <Navbar/>
      </div>
    </>
  )
}

export default App
