import React from 'react'
import Mess from './components/Mess'
import Tiffin from './components/Tiffin'
import Junk from './components/Junk'
import './styles/App.css'

const App = () => {
  return (
    <div className='app-main'>
      <Mess/>
      <Tiffin/>
      <Junk/>
    </div>
  )
}

export default App
