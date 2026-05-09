import React from "react";
import "./Cart.css";

function Cart({ setCartItems, cartItems, setIsCartOpen }) {
  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <div className="cartheader">
          <h2>Your Cart</h2>
        </div>
        {cartItems.length === 0 ? (
          <p className="empty-cart">No Items...</p>
        ) : (
          <>
            <div className="">
              {cartItems.map((item) => {
                return (
                  <div className="cart-item" key={item.id}>
                    <div>
                      <p className="item-title">{item.title}</p>
                      <p className="item-price">{item.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <button
          className="checkout-button" onClick={() => setIsCartOpen()}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Cart;
