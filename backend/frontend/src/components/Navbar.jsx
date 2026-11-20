
import React from "react";
import {
  Store,
  ShoppingCart,
  UserRound,
  LogIn,
  LogOut
} from "lucide-react";

function Navbar({
  user,
  cartCount,
  onLogin,
  onProfile,
  onLogout,
  onCart
}) {
  return (
    <nav className="navbar">

      <div className="logo">
        <Store size={27} />
        <span>Fresh<span className="green">Mart</span></span>
      </div>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#products">Products</a>
      </div>

      <div className="nav-actions">

        <button className="nav-button" onClick={onCart}>
          <ShoppingCart size={19} />
          Cart ({cartCount})
        </button>

        {user ? (
          <>
            <button className="nav-button" onClick={onProfile}>
              <UserRound size={18} />
              {user.name.split(" ")[0]}
            </button>

            <button className="logout-button" onClick={onLogout}>
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <button className="login-button" onClick={onLogin}>
            <LogIn size={18} />
            Login
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
