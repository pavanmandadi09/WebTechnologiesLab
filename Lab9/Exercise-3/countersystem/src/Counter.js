import React, { useState } from "react";

function Counter() {
  // State initialization
  const [count, setCount] = useState(0);

  // Increment function
  const increment = () => {
    setCount(count + 1);
  };

  // Decrement function
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Current Count: {count}</h2>

      <button onClick={increment} style={{ margin: "10px" }}>
        Increment
      </button>

      <button onClick={decrement} style={{ margin: "10px" }}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;