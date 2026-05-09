import React from 'react'

export default function Card({card}) {
  return (
    <div key={card.code} className="card-item">
      <img src={card.image} alt={card.value} className="card-image" />
    </div>
  );
}
