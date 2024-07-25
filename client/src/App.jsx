import React from 'react'
import Mess from './components/Mess'
import Tiffin from './components/Tiffin'
import Junk from './components/Junk'
import './styles/App.css'
import Summary from './components/Summary'
import{useState} from 'react'

const App = () => {

  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1);
  }

  return (
    <React.Fragment>
      <div className="app-container">
        <div className='app-main'>
          <Mess onExpenseAdded={triggerRefresh}/>
          <Tiffin onExpenseAdded={triggerRefresh}/>
          <Junk onExpenseAdded={triggerRefresh}/>
        </div>
        <Summary refreshKey={refreshKey}/>
      </div>
    </React.Fragment>
  )
}

export default App
