import { useState } from "react";
import "./index.css";
import { Stats } from "./components/stats";
import Logo from "./components/logo";
import Form from "./components/form";
import PackingList from "./components/packingList";

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
  const handleClearList = ()=> {
    const confirmed = window.confirm('Are you sure you want to clear the list?')
    if(confirmed) setItems([])
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onPackedItem={handlePackedItem} onClearList={handleClearList}/>
      <Stats items={items}/>
    </div>
  );
}








