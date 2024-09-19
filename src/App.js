// src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim() === '') return;
    setItems([...items, newItem]);
    setNewItem('');
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task List</h1>
        <p>Add and delete items from the list.</p>
        <div className="item-input">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Enter a new task"
          />
          <button onClick={handleAddItem}>Add Item</button>
        </div>
        <ul className="item-list">
          {items.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => handleDeleteItem(index)} className="delete-btn">Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
