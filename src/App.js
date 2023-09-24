import { useState } from "react";
import "./index.css";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo(){
  return <h1>✈ Far Away 🧳</h1>
}
function Form(){
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)
  const handleAddItem = (e)=>{
    e.preventDefault()
    if (!description) return
    const newItem = {quantity:quantity, description:description, id: Date.now(), packed:false}
    setDescription('')
    setQuantity(1)
  
  }
  return <div>
    <form className="add-form" onSubmit={(e)=>handleAddItem(e)}>
    <h3>What do you need for your 💕 trip?</h3>
      <select value={quantity} onChange={e=>setQuantity(+e.target.value)}>
      {Array.from({length:20},(_,i)=>i+1).map(i=><option value={i} key={i}>{i}</option>)}
      </select>
      <input type="text" placeholder="Item...." value={description} onChange={(e)=>setDescription(e.target.value)}/>
      <button>ADD</button>
    </form>
    
  </div>
}
function PackingList(){
  
  return <div className="list">
    <ul > {
    initialItems.map((item)=><Item item={item} key={item.id} />)
  }
  </ul>
  </div> 
}
function Item({item}){
  return <li>
    <span style={item.packed?{textDecoration:'line-through'}:{}}>{item.quantity} {item.description}</span>
    <button>❌</button>
    </li>
}
function Stats(){
  return <footer className="stats">
    <em>🧳 you have x items in your list, and you already packed X (X%) 💹</em>
  </footer>
}
