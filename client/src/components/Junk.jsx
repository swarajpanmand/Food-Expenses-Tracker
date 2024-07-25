import React from 'react'
import '../styles/App.css'
import { useState } from 'react'
import axios from 'axios'

const Junk = ({onExpenseAdded}) => {

  const [data, setData] = useState({
    date: '',
    item: 'junk',
    cost: '',
    itemBrief: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setData((preData)=> ({
      ...preData,
      [name]: value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!data.date || !data.item || !data.cost) {
      alert('Please fill all fields');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/', data)
      if(response.data){
        alert('Data submitted successfully');
        onExpenseAdded();
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred while submitting data');
    }
  
    setData({
      date: '',
      item: 'junk',
      cost: '',
      itemBrief: ''
    })
  }

  return (
    <div className='junk expense-card'>
      <h2>Junkfood</h2>
      <form onSubmit={handleSubmit}>  
        <div className="date-item">
          <div className='date'>
            <h3>Date</h3>
            <input type='date' name='date' value={data.date} onChange={handleChange}/>
          </div>
          <div className="item">
            <h3>Item</h3>
            <input type='text' name='itemBrief' value={data.itemBrief} onChange={handleChange}/>
          </div>
        </div>
        <div className="cost">
          <h3>Cost</h3>
          <input type='number' name='cost' value={data.cost} onChange={handleChange}/>
        </div>
        <button type='submit'>
          Add Expense
        </button>
        </form>
    </div>
  )
}

export default Junk
