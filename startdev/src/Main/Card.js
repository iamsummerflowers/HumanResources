import React from 'react';
import './Card.css';

function Card({ id, header, bodyItems }) {
  return (
    <div className="card" id={id}>
        <h3>{header}</h3>
        <ul>
          {bodyItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
    </div>
  );
}

export default Card;