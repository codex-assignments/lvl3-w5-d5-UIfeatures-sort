import React from "react";
import "./ItemCard.css";

function ItemCard({ item, cartItems, setCartItems }) {
  return (
    <div className="item-card">
      <div className="item-image-container">
        <img
          src={item.thumbnail}
          alt={item.description}
          className="item-image"
        />
        <span className={`item-category ${item.category}`}>
          {item.category}
        </span>
      </div>
      <div className="item-content">
        <h2>{item.title}</h2>
        <p className="item-description">{item.description}</p>

        <div className="item-rating">⭐{item.rating}</div>
        <div className="item-footer">
          <div>
            <p className="price">${item.price}</p>
            <p className="stock">{item.stock} available</p>
          </div>
          <button onClick={(e)=> setCartItems([...cartItems, item])}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
