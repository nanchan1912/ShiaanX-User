import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiShoppingBag, FiMessageSquare } from 'react-icons/fi';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Recent enquiries data
  const recentEnquiries = [
    {
      id: 1,
      subject: 'Item #19203: Screw Driver',
      date: '2026-01-03',
      status: 'Quote Pending'
    },
    {
      id: 2,
      subject: 'Item #18093: Truck Component',
      date: '2026-01-02',
      status: 'Quote Ready'
    },
    {
      id: 3,
      subject: 'Item #12394: Maneuver Gear A',
      date: '2026-01-01',
      status: 'Quote Ready'
    }
  ];

  return (
    <div className="home-content">
      <div className="welcome-text">
        <h1>Welcome back, {user?.name || 'User'}!</h1>
        <h3>What would you like to do today?</h3>
      </div>

      <div className="cards-grid">
        <div className="info-card" onClick={() => navigate('/home')}>
          <div className="card-icon">
            <FiShoppingBag size={28} color="#2160b7" />
          </div>
          <h3>Browse Manufacturers</h3>
          <p>Check out the services and machinery we have available</p>
        </div>

        <div className="info-card" onClick={() => navigate('/enquiries')}>
          <div className="card-icon">
            <FiMessageSquare size={28} color="#2160b7" />
          </div>
          <h3>Make Enquiries</h3>
          <p>Upload your CAD files, choose your options to get a rough quotation</p>
        </div>

        <div className="info-card" onClick={() => navigate('/orders')}>
          <div className="card-icon">
            <FiShoppingBag size={28} color="#2160b7" />
          </div>
          <h3>Track Orders</h3>
          <p>Keep track of all your orders in one place</p>
        </div>
      </div>

      <div className="recent-section">
        <h2>Recent Enquiries</h2>
        <div className="recent-list">
          {recentEnquiries.slice(0, 3).map(enquiry => (
            <div key={enquiry.id} className="recent-item" onClick={() => navigate('/enquiries')}>
              <div className="recent-info">
                <span className="recent-subject">{enquiry.subject}</span>
                <span className="recent-date">{enquiry.date}</span>
              </div>
              <span
                className={`status-badge quote ${
                  enquiry.status === 'Quote Ready' ? 'ready' : 'pending'
                }`}
              >
                {enquiry.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
