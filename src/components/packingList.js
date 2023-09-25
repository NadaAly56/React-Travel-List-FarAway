import { useState } from "react";
import Item from "./item";

function PackingList({items, onDeleteItem, onPackedItem, onClearList}){
    const [sortBy, setSortBy] = useState('input')
    let sortedItems;
    if (sortBy === 'input') sortedItems = items
    else if (sortBy === 'description') sortedItems = items
    .slice()
    .sort((a, b)=> a.description.localeCompare(b.description))
  
    else sortedItems = items.slice()
    .sort((a, b)=> Number(a.packed) - Number(b.packed))
  
    return <div className="list">
      <ul > {
      sortedItems.map((item)=><Item item={item} key={item.id} onDeleteItem={onDeleteItem} onPackedItem={onPackedItem} />)
    }
    </ul>
  
    {items.length ? <div className="actions">
    <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
      <option value='input'>Sort by input order</option>
      <option value='description'>Sort by description</option>
      <option value='packed'>Sort by packed statue</option>
    </select>
    <button onClick={()=>onClearList()}>Clear List</button>
    </div>: null}
    </div> 
  }
  export default PackingList