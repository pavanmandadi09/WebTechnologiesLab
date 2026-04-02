import React from "react";

function StudentCard(props) {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p><strong>Department:</strong> {props.department}</p>
      <p><strong>Marks:</strong> {props.marks}</p>
    </div>
  );
}

export default StudentCard;