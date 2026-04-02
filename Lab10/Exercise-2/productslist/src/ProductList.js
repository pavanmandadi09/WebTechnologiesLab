import React, { useState } from "react";

function ProductList() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (input.trim() === "") return;

    const newItem = {
      id: Date.now(),
      name: input
    };

    setItems([...items, newItem]);
    setInput("");
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="text"
        placeholder="Enter item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addItem}>Add</button>

      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        <ul style={{ listStyle: "none" }}>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;