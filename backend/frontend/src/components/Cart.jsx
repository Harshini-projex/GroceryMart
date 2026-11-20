
import React, { useState } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";

function Cart({
  cart,
  user,
  onQuantityChange,
  onRemove,
  onClose,
  onCheckout
}) {

  const [address, setAddress] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const handleCheckout = () => {
    if (!user) {
      onCheckout("");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    onCheckout(address);
  };

  return (
    <div className="modal-overlay">
      <div className="cart-section">

        <div className="cart-heading">
          <h2>Your Shopping Cart</h2>
          <button onClick={onClose}><X /></button>
        </div>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map(item => (
              <div className="cart-item" key={item._id}>
                <div>
                  <h4>{item.name}</h4>
                  <p>₹{item.price} each</p>
                </div>

                <div className="quantity">
                  <button
                    onClick={() => onQuantityChange(item._id, -1)}
                  >
                    <Minus size={15} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    disabled={item.quantity >= item.stock}
                    onClick={() => onQuantityChange(item._id, 1)}
                  >
                    <Plus size={15} />
                  </button>

                  <button onClick={() => onRemove(item._id)}>
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}

            <h3 className="total">
              Total: ₹{total.toFixed(2)}
            </h3>

            {user && (
              <div className="delivery-address">
                <h3>Delivery Details</h3>
                <p>Delivering to: {user.name}</p>

                <textarea
                  placeholder="Enter your complete delivery address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                />
              </div>
            )}

            <button
              className="place-order"
              onClick={handleCheckout}
            >
              {user ? "Place Order" : "Login to Place Order"}
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Cart;
