import React, { useState, useEffect } from "react";

function FetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // runs only once

  // Loading state
  if (loading) {
    return <h3>Loading...</h3>;
  }

  // Error state
  if (error) {
    return <h3 style={{ color: "red" }}>Error: {error}</h3>;
  }

  return (
    <div>
      {data.slice(0, 10).map((item) => (
        <div key={item.id} style={{ marginBottom: "15px" }}>
          <h4>{item.title}</h4>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export default FetchData;