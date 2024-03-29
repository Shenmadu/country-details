import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'

function App() {


  return (
    <div>
      <div className="row">
        <Navbar />
      </div>
      <div className="row">
        <Home></Home>
      </div>

    </div>
  )
}

export default App
