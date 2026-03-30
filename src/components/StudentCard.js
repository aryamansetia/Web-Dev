import React from "react";
import "./StudentCard.css";

function StudentCard({ name, regNo, department, cgpa, onEdit, onDelete }) {
  // A tiny computed label to make the card feel more informative.
  const performanceLabel = cgpa >= 3.5 ? "Excellent standing" : "Good standing";

  return (
    <article className="student-card">
      <header className="student-card__header">
        <h2>{name}</h2>
        <p className="student-card__reg">Reg No: {regNo}</p>
      </header>

      <ul className="student-card__details">
        <li>
          <span>Department:</span> {department}
        </li>
        <li>
          <span>CGPA:</span> {cgpa.toFixed(2)}
        </li>
        <li>
          <span>Status:</span> {performanceLabel}
        </li>
      </ul>

      <div className="student-card__actions">
        <button type="button" className="student-card__button" onClick={onEdit}>
          Edit
        </button>
        <button
          type="button"
          className="student-card__button student-card__button--danger"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default StudentCard;
