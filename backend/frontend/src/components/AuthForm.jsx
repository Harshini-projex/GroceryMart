
import React, { useState } from "react";
import {
  X, UserPlus, LogIn, User, Mail,
  Phone, Lock
} from "lucide-react";

function AuthForm({ mode, onClose, onSubmit }) {

  const [isLogin, setIsLogin] = useState(mode === "login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(form, isLogin);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="auth-modal">

        <button className="close-button" onClick={onClose}>
          <X />
        </button>

        <div className="auth-icon">
          {isLogin ? <LogIn size={30} /> : <UserPlus size={30} />}
        </div>

        <h2>
          {isLogin ? "Welcome Back!" : "Create Your Profile"}
        </h2>

        <p>
          {isLogin
            ? "Login to continue shopping."
            : "Join FreshMart and enjoy fresh groceries."}
        </p>

        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <>
              <label>Full Name</label>
              <div className="auth-input">
                <User size={18} />
                <input
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <label>Phone Number</label>
              <div className="auth-input">
                <Phone size={18} />
                <input
                  name="phone"
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="10-digit phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <label>Email Address</label>
          <div className="auth-input">
            <Mail size={18} />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <label>Password</label>
          <div className="auth-input">
            <Lock size={18} />
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>

          <button className="auth-submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isLogin ? "Login" : "Create Profile"}
          </button>

        </form>

        <div className="auth-switch">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create Profile" : "Login"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AuthForm;
