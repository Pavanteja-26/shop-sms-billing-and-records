import React, { useState } from 'react';
import { createBill } from '../../services/api';

const BillForm = ({ onBillCreated }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    items: [{ name: '', price: '' }]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', price: '' }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        items: newItems
      }));
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      return sum + price;
    }, 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate items
      const validItems = formData.items.filter(item => item.name && item.price);
      
      if (validItems.length === 0) {
        setError('Please add at least one item');
        setLoading(false);
        return;
      }

      // Prepare data
      const billData = {
        customer_name: formData.customer_name.trim(),
        phone: formData.phone.trim(),
        items: validItems.map(item => ({
          name: item.name.trim(),
          price: parseFloat(item.price)
        })),
        total_amount: parseFloat(calculateTotal())
      };

      // Submit
      const response = await createBill(billData);
      
      if (response.success) {
        setSuccess(`Bill created successfully! ${response.data.sms_message}`);
        
        // Reset form
        setFormData({
          customer_name: '',
          phone: '',
          items: [{ name: '', price: '' }]
        });

        // Notify parent component
        if (onBillCreated) {
          onBillCreated(response.data);
        }

        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(''), 5000);
      } else {
        setError(response.message || 'Failed to create bill');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.response?.data?.errors?.join(', ') || 
        'Failed to create bill'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bill-form-container">
      <h2>Create New Bill</h2>

      <form onSubmit={handleSubmit} className="bill-form">
        {/* Customer Details */}
        <div className="form-section">
          <h3>Customer Details</h3>
          
          <div className="form-group">
            <label htmlFor="customer_name">Customer Name *</label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleInputChange}
              placeholder="Enter customer name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="10-digit mobile number"
              pattern="[6-9][0-9]{9}"
              required
              disabled={loading}
            />
            <small>Enter 10-digit Indian mobile number</small>
          </div>
        </div>

        {/* Items */}
        <div className="form-section">
          <h3>Items</h3>
          
          {formData.items.map((item, index) => (
            <div key={index} className="item-row">
              <div className="form-group">
                <label>Item Name</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  placeholder="e.g., Mop"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                  placeholder="0.00"
                  disabled={loading}
                />
              </div>

              {formData.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="btn btn-danger btn-small"
                  disabled={loading}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="btn btn-secondary"
            disabled={loading}
          >
            + Add Another Item
          </button>
        </div>

        {/* Total */}
        <div className="form-section total-section">
          <h3>Total Amount</h3>
          <div className="total-display">
            ₹{calculateTotal()}
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          {loading ? 'Creating Bill & Sending SMS...' : 'Create Bill & Send SMS'}
        </button>
      </form>
    </div>
  );
};

export default BillForm; 