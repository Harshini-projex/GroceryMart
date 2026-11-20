
import React from "react";
import { ShoppingBag } from "lucide-react";

function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-content">
        <span className="tag">FRESHNESS DELIVERED</span>

        <h1>
          Fresh groceries,<br />
          <span>Happy living!</span>
        </h1>

        <p>
          Get your daily essentials at the best prices.
          Fresh products, easy shopping and a better lifestyle.
        </p>

        <a href="#products" className="shop-button">
          Shop Now <ShoppingBag size={18} />
        </a>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"
          alt="Fresh groceries"
        />
      </div>

    </section>
  );
}

export default Hero;
