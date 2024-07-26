// File: client/src/App.jsx
import React from 'react'
import './styles/App.css'
import Summary from './components/Summary'
import { useState } from 'react'
import Type from './components/Type'

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1);
  }

  return (
    <React.Fragment>
      <div className="app-container">
        <h1>Food Expenses Tracker</h1>
        <div className='app-main'>
          <Type onExpenseAdded={triggerRefresh}/>
          <Summary refreshKey={refreshKey} displayMode="daily"/>
        </div>
        <Summary refreshKey={refreshKey} displayMode="monthly"/>
      </div>
    </React.Fragment>
  )
}

export default App