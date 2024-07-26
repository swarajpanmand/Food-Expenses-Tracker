import React from "react";
import "../styles/App.css";
import { useState } from "react";   
import axios from "axios";


const Type = ({onExpenseAdded}) => {

    const [data, setData] = useState({
        date: "",
        item: "",
        cost: "",
        itemBrief: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target
        setData((preData)=> ({
            ...preData,
            [name]: value
        }))
        
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!data.date || !data.item || !data.cost) {
            alert("Please fill all fields");
            return;
        }
        try{
            const response = await axios.post("http://localhost:3000/", data)
            if(response.data){
                alert("Data submitted successfully");
                onExpenseAdded();
            }
        }catch(error){
            console.error(error)
            alert("An error occurred while submitting data");
        }

        setData({
            date: "",
            item: "",
            cost: "",
            itemBrief: ""
        })
    }

  return (
    <div className=' type '>
      <h3>New Food Expense</h3>
      <form onSubmit={handleSubmit}>  
        <div className="date-item">
            <div className="select-food">
                <select name="item" value={data.item} placeholder="select" onChange={handleChange}>
                    <option value="">Select Food Category</option>
                    <option value="junk">Junk</option>
                    <option value="tiffin">Tiffin</option>
                    <option value="mess">Mess</option>
                </select>
            </div>
          <div className='date'>
            <input type='date' name='date' value={data.date} onChange={handleChange}/>
          </div>
          {data.item === "junk" && (
            <div className="item">
            <input type='text' placeholder="Item" name='itemBrief' value={data.itemBrief} onChange={handleChange}/>
          </div>
          )}
        </div>
        <div className="cost">
          <input type='number' placeholder="Cost" name='cost' value={data.cost} onChange={handleChange}/>
        </div>
        <button type='submit'>
          Add Expense
        </button>
        </form>
    </div>
  )
}

export default Type
