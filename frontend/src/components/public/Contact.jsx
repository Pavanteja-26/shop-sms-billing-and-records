import React from 'react';

const Contact = () => {
  const shopName = process.env.REACT_APP_SHOP_NAME || 'Our Shop';
  const shopPhone = process.env.REACT_APP_SHOP_PHONE || '+919876543210';
  const shopWhatsApp = process.env.REACT_APP_SHOP_WHATSAPP || '919876543210';
  const shopEmail = process.env.REACT_APP_SHOP_EMAIL || 'info@yourshop.com';
  const shopAddress = process.env.REACT_APP_SHOP_ADDRESS || '123 Main Street, City, State';
  const mapsUrl = process.env.REACT_APP_GOOGLE_MAPS_URL;

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="subtitle">We'd love to hear from you! Get in touch with us.</p>

      <div className="contact-grid">
        <div className="contact-card">
          <div className="contact-icon">📞</div>
          <h3>Call Us</h3>
          <a href={`tel:${shopPhone}`} className="contact-link">
            {shopPhone}
          </a>
          <p className="contact-desc">Available during business hours</p>
        </div>

        <div className="contact-card">
          <div className="contact-icon">💬</div>
          <h3>WhatsApp</h3>
          <a 
            href={`https://wa.me/${shopWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link whatsapp-link"
          >
            Chat on WhatsApp
          </a>
          <p className="contact-desc">Quick responses guaranteed</p>
        </div>

        <div className="contact-card">
          <div className="contact-icon">✉️</div>
          <h3>Email</h3>
          <a href={`mailto:${shopEmail}`} className="contact-link">
            {shopEmail}
          </a>
          <p className="contact-desc">We'll respond within 24 hours</p>
        </div>

        <div className="contact-card">
          <div className="contact-icon">📍</div>
          <h3>Visit Us</h3>
          <p className="address">{shopAddress}</p>
          {mapsUrl && (
            <a 
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              View on Google Maps
            </a>
          )}
        </div>
      </div>

      <div className="business-hours">
        <h2>Business Hours</h2>
        <div className="hours-grid">
          <div className="hours-row">
            <span className="day">Monday - Saturday</span>
            <span className="time">9:00 AM - 8:00 PM</span>
          </div>
          <div className="hours-row">
            <span className="day">Sunday</span>
            <span className="time">10:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      <div className="contact-cta">
        <h2>Need Help?</h2>
        <p>
          Whether you have a question about our products, return policy, or anything else, 
          our team is ready to answer all your questions.
        </p>
        <div className="cta-buttons">
          <a 
            href={`tel:${shopPhone}`}
            className="btn btn-primary"
          >
            Call Now
          </a>
          <a 
            href={`https://wa.me/${shopWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;