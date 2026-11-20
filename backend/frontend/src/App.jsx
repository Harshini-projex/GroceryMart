
import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AuthForm from "./components/AuthForm";
import Profile from "./components/Profile";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

import "./App.css";

const API = "http://localhost:5000/api";

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [authMode, setAuthMode] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Fetch products
  useEffect(() => {
    axios.get(`${API}/products`)
      .then(res => setProducts(res.data))
      .catch(error => {
        console.error(error);
        alert("Unable to load products.");
      });
  }, []);

  // Restore login session
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    axios.get(`${API}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      });

  }, [token]);

  // Login and create profile
  const handleAuth = async (form, isLogin) => {
    try {

      if (isLogin) {

        const response = await axios.post(
          `${API}/auth/login`,
          {
            email: form.email,
            password: form.password
          }
        );

        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setUser(response.data.user);

        alert("Login successful!");

      } else {

        await axios.post(
          `${API}/auth/register`,
          form
        );

        alert("Profile created successfully! Logging you in...");

        // Automatically login after registration
        const response = await axios.post(
          `${API}/auth/login`,
          {
            email: form.email,
            password: form.password
          }
        );

        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setUser(response.data.user);

      }

      setAuthMode(null);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Authentication failed. Please try again."
      );

    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
    setCart([]);

    setShowProfile(false);

    alert("Logged out successfully!");
  };

  // Add to cart
  const addToCart = (product) => {

    if (product.stock <= 0) {
      alert("Product is out of stock!");
      return;
    }

    setCart(prev => {

      const existing = prev.find(
        item => item._id === product._id
      );

      if (existing) {

        if (existing.quantity >= product.stock) {
          alert("Stock limit reached!");
          return prev;
        }

        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        { ...product, quantity: 1 }
      ];

    });
  };

  // Update cart quantity
  const changeQuantity = (id, amount) => {

    setCart(prev =>
      prev.map(item => {

        if (item._id === id) {

          const newQuantity = item.quantity + amount;

          return {
            ...item,
            quantity: Math.min(
              Math.max(0, newQuantity),
              item.stock
            )
          };
        }

        return item;

      }).filter(item => item.quantity > 0)
    );
  };

  // Remove cart item
  const removeItem = (id) => {
    setCart(prev =>
      prev.filter(item => item._id !== id)
    );
  };

  // Place order
  const placeOrder = async (address) => {

    if (!user || !token) {
      alert("Please login before placing an order.");
      setShowCart(false);
      setAuthMode("login");
      return;
    }

    try {

      const orderItems = cart.map(item => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      await axios.post(
        `${API}/orders`,
        {
          customerName: user.name,
          phone: user.phone,
          address,
          items: orderItems
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Your order has been placed successfully!");

      setCart([]);
      setShowCart(false);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to place order."
      );

    }
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (

    <div className="app">

      <Navbar
        user={user}
        cartCount={cartCount}
        onLogin={() => setAuthMode("login")}
        onProfile={() => setShowProfile(true)}
        onLogout={handleLogout}
        onCart={() => setShowCart(true)}
      />

      <Hero />

      <ProductList
        products={products}
        onAdd={addToCart}
      />

      <footer>
        <h3>FreshMart Grocery Store</h3>
        <p>Fresh choices for a healthier lifestyle.</p>
        <p>© 2026 FreshMart. All rights reserved.</p>
      </footer>

      {/* Login and Registration */}
      {authMode && (
        <AuthForm
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSubmit={handleAuth}
        />
      )}

      {/* User Profile */}
      {showProfile && (
        <Profile
          user={user}
          onClose={() => setShowProfile(false)}
        />
      )}

      {/* Shopping Cart */}
      {showCart && (
        <Cart
          cart={cart}
          user={user}
          onQuantityChange={changeQuantity}
          onRemove={removeItem}
          onClose={() => setShowCart(false)}
          onCheckout={placeOrder}
        />
      )}

    </div>
  );
}

export default App;
