import { useState } from "react";
import "./index.css";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];
export default function App() {
  const [items, setItems] = useState([])

  const handleAddItems = (newItem)=>{
    setItems((item)=> [...item, newItem])
  }
  const handleDeleteItem = (itemId)=>{ 
    setItems(items => items.filter((item)=> item.id !== itemId))
  }
  const handlePackedItem = (itemId) => {
    setItems((items)=> items.map(item=> item.id === itemId ?
       {...item, packed: !item.packed}: item))
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onPackedItem={handlePackedItem}/>
      <Stats items={items}/>
    </div>
  );
}

function Logo(){
  return <h1>✈ Far Away 🧳</h1>
}

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

function PackingList({items, onDeleteItem, onPackedItem}){
  
  return <div className="list">
    <ul > {
    items.map((item)=><Item item={item} key={item.id} onDeleteItem={onDeleteItem} onPackedItem={onPackedItem} />)
  }
  </ul>
  </div> 
}

function Item({item, onDeleteItem, onPackedItem}){
  
  return <li>
    <input type="checkbox" value={item.packed} onChange={()=> onPackedItem(item.id)}></input>
    <span style={item.packed?{textDecoration:'line-through'}:{}}>{item.quantity} {item.description}</span>
    <button onClick={()=>onDeleteItem(item.id)}>❌</button>
    </li>
}

function Stats({items}){
  if (!items.length) {
    return <footer className="stats">
    <em> Start adding some items to your packing list 🚀</em>
  </footer>
  }
  
  const count = items.filter(item=>item.packed).length
  const countPercent = Math.round((count / items.length) * 100)
  return <footer className="stats">
    <em> {countPercent === 100 && 'You got everything! Ready to go ✈'}
      {countPercent< 100 && `🧳 you have ${items.length} items in your list, and you already packed ${count} (${countPercent}%) 💹`}</em>
  </footer>
}
