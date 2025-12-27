import React from 'react';

const Home = () => {
  const shopName = process.env.REACT_APP_SHOP_NAME || 'Our Shop';
  const shopPhone = process.env.REACT_APP_SHOP_PHONE || '+919876543210';
  const shopAddress = process.env.REACT_APP_SHOP_ADDRESS || '123 Main Street, City, State';

  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to {shopName}</h1>
        <p className="tagline">Your trusted source for quality home essentials</p>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>
          We are a local retail shop specializing in everyday essentials for your home. 
          With years of experience serving our community, we pride ourselves on quality 
          products and excellent customer service.
        </p>
      </section>

      <section className="products">
        <h2>What We Sell</h2>
        <div className="product-grid">
          <div className="product-card">
            <div className="product-icon">🧹</div>
            <h3>Brooms</h3>
            <p>High-quality cleaning brooms for all surfaces</p>
          </div>
          <div className="product-card">
            <div className="product-icon">🧽</div>
            <h3>Mops</h3>
            <p>Durable mops for efficient floor cleaning</p>
          </div>
          <div className="product-card">
            <div className="product-icon">🪢</div>
            <h3>Ropes</h3>
            <p>Strong ropes for various household needs</p>
          </div>
          <div className="product-card">
            <div className="product-icon">🏕️</div>
            <h3>Tarpaulin</h3>
            <p>Weather-resistant tarpaulin sheets</p>
          </div>
        </div>
      </section>

      <section className="contact-info">
        <h2>Visit Us</h2>
        <div className="info-card">
          <div className="info-item">
            <strong>📍 Address:</strong>
            <p>{shopAddress}</p>
          </div>
          <div className="info-item">
            <strong>📞 Phone:</strong>
            <p>{shopPhone}</p>
          </div>
          <div className="info-item">
            <strong>⏰ Hours:</strong>
            <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
            <p>Sunday: 10:00 AM - 6:00 PM</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;