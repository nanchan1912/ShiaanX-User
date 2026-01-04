import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiHome, FiShoppingBag, FiMessageSquare, FiUser, FiBell, FiSettings } from 'react-icons/fi';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleLogout = () => {
    navigate('/login');
  };

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
    <div className="home-container">
      {/* Top Navigation Bar */}
      <div className="topbar">
        <button className="menu-btn" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
        <div className="topbar-right">
          <div className="topbar-icons">
            <button className="icon-btn">
              <FiUser size={20} />
            </button>
            <button className="icon-btn">
              <FiBell size={20} />
            </button>
            <button className="icon-btn" onClick={toggleSettings}>
              <FiSettings size={20} />
            </button>
            {settingsOpen && (
              <div className="settings-dropdown">
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
          <img src={process.env.PUBLIC_URL + '/logoimg.png'} alt="ShiaanX" className="topbar-logo-img" />
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={process.env.PUBLIC_URL + '/logoimg.png'} alt="ShiaanX" className="sidebar-logo" />
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-item" onClick={() => { navigate('/home'); setSidebarOpen(false); }}>
            <FiHome size={20} />
            <span>Home</span>
          </div>
          
          <div className="nav-item" onClick={() => { navigate('/enquiries'); setSidebarOpen(false); }}>
            <FiMessageSquare size={20} />
            <span>My Enquiries</span>
          </div>
          
          <div className="nav-item" onClick={() => { navigate('/orders'); setSidebarOpen(false); }}>
            <FiShoppingBag size={20} />
            <span>My Orders</span>
          </div>
        </nav>
      </div>

      {/* Overlay when sidebar is open */}
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Main Content */}
      <div className="main-content">
        <div className="welcome-text">
          <h1>Welcome back, Nandini!</h1>
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
    </div>
  );
}

export default Home;
