import { useState } from "react"

function Form({onAddItem}){
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(1)
  
    const handleSubmit = (e)=>{
      e.preventDefault()
      if (!description) return
      const newItem = {quantity:quantity, description:description, id: Date.now(), packed:false}
      onAddItem(newItem)
      setDescription('')
      setQuantity(1)
    
    }
    return <div>
      <form className="add-form" onSubmit={(e)=>handleSubmit(e)}>
      <h3>What do you need for your 💕 trip?</h3>
        <select value={quantity} onChange={e=>setQuantity(+e.target.value)}>
        {Array.from({length:20},(_,i)=>i+1).map(i=><option value={i} key={i}>{i}</option>)}
        </select>
        <input type="text" placeholder="Item...." value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <button>ADD</button>
      </form>
      
    </div>
  }
export default Form