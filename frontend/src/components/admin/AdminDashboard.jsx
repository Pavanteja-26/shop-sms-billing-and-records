import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyAuth, getBills } from '../../services/api';
import BillForm from './BillForm';

const AdminDashboard = () => {
  const [recentBills, setRecentBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadRecentBills();
  }, []);

  const checkAuth = async () => {
    try {
      await verifyAuth();
    } catch (err) {
      navigate('/admin');
    }
  };

  const loadRecentBills = async () => {
    try {
      const response = await getBills(10, 0);
      if (response.success) {
        setRecentBills(response.data);
      }
    } catch (err) {
      console.error('Failed to load bills:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleBillCreated = (billData) => {
    // Reload recent bills
    loadRecentBills();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage bills and SMS notifications</p>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        {/* Bill Form */}
        <div className="dashboard-section">
          <BillForm onBillCreated={handleBillCreated} />
        </div>

        {/* Recent Bills */}
        <div className="dashboard-section">
          <h2>Recent Bills</h2>
          
          {loading ? (
            <div className="loading">Loading bills...</div>
          ) : recentBills.length === 0 ? (
            <div className="empty-state">
              No bills created yet. Create your first bill above!
            </div>
          ) : (
            <div className="bills-table-container">
              <table className="bills-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Amount</th>
                    <th>SMS Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBills.map(bill => (
                    <tr key={bill.id}>
                      <td>#{bill.id}</td>
                      <td>{bill.customer_name}</td>
                      <td>{bill.phone}</td>
                      <td>₹{bill.total_amount}</td>
                      <td>
                        <span className={`status-badge status-${bill.sms_status.toLowerCase()}`}>
                          {bill.sms_status}
                        </span>
                      </td>
                      <td>{formatDate(bill.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;