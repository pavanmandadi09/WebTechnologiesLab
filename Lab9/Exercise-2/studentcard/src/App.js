import React from "react";
import StudentCard from "./StudentCard";
import "./App.css";

function App() {
  const students = [
    { name: "Pavan", department: "CSE", marks: 85 },
    { name: "Rahul", department: "ECE", marks: 78 },
    { name: "Sneha", department: "IT", marks: 92 },
    { name: "Anjali", department: "EEE", marks: 88 }
  ];

  return (
    <div className="app">
      <h1>Student Cards</h1>

      <div className="card-container">
        {students.map((student, index) => (
          <StudentCard
            key={index}
            name={student.name}
            department={student.department}
            marks={student.marks}
          />
        ))}
      </div>
    </div>
  );
}

export default App;