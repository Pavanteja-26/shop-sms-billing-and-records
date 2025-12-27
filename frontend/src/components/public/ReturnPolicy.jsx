import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Return & Exchange Policy</h1>
      
      <div className="policy-content">
        <section className="policy-section">
          <h2>⚠️ Important Notice</h2>
          <div className="notice-box">
            <p>
              <strong>NO RETURNS OR EXCHANGES ARE ACCEPTED FOR GENERAL PURCHASES</strong>
            </p>
            <p>
              All sales are final. Please inspect items carefully before purchase.
            </p>
          </div>
        </section>

        <section className="policy-section">
          <h2>🔧 Defective Items Only</h2>
          <p>
            We stand behind the quality of our products. If you receive a defective item, 
            we will gladly replace it under the following conditions:
          </p>
          <ul>
            <li>
              <strong>Time Limit:</strong> Defective items must be returned within 24 hours 
              of purchase
            </li>
            <li>
              <strong>Original Bill Required:</strong> You must present the original purchase 
              bill for verification
            </li>
            <li>
              <strong>Proof of Defect:</strong> The defect must be clearly visible and 
              present at the time of purchase
            </li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>❌ Items NOT Eligible for Return</h2>
          <p>The following items cannot be returned or exchanged under any circumstances:</p>
          <ul>
            <li>Items that have been used or show signs of use</li>
            <li>Items that have been cut, modified, or altered</li>
            <li>Items that are dirty, stained, or damaged due to customer handling</li>
            <li>Items without original packaging (where applicable)</li>
            <li>Items purchased more than 24 hours ago</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>📋 Return Process for Defective Items</h2>
          <ol>
            <li>Visit our store within 24 hours of purchase</li>
            <li>Bring the defective item in its original condition</li>
            <li>Present your original purchase bill</li>
            <li>Our staff will inspect the item</li>
            <li>If approved, we will provide a replacement of the same item</li>
          </ol>
        </section>

        <section className="policy-section">
          <h2>📞 Questions?</h2>
          <p>
            If you have any questions about our return policy or believe you have received 
            a defective item, please contact us immediately:
          </p>
          <div className="contact-box">
            <p>
              <strong>Phone:</strong> {process.env.REACT_APP_SHOP_PHONE || '+919876543210'}
            </p>
            <p>
              <strong>Visit:</strong> {process.env.REACT_APP_SHOP_ADDRESS || 'Our Store Location'}
            </p>
          </div>
        </section>

        <section className="policy-section">
          <div className="disclaimer">
            <p>
              <em>
                This policy is designed to protect both our customers and our business. 
                We appreciate your understanding and cooperation.
              </em>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy;