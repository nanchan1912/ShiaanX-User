import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiHome, FiShoppingBag, FiMessageSquare, FiSearch, FiUser, FiBell, FiSettings, FiAlertCircle } from 'react-icons/fi';
import '../styles/Enquiries.css';

function Enquiries() {
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


  const enquiries = [
    {
      id: 1,
      subject: 'Item #19203: Screw Driver',
      message: 'Anodized Silver Coating, Hex Finish, M8 Threading, Heat-Treated Steel Body, Suitable for High-Load Applications',
      date: '2026-01-03',
      status: 'Quote Pending'
    },
    {
      id: 2,
      subject: 'Item #18093: Truck Component',
      message: 'Matte Black Finish, Dual-Groove Design, 6-Thread Configuration, Lightweight Composite Material, Optimized for Repetitive Assembly',
      date: '2026-01-02',
      status: 'Quote Ready'
    },
    {
      id: 3,
      subject: 'Item #12394: Maneuver Gear A',
      message: 'Nickel Plated Surface, Smooth Round Finish, Fine-Thread Pattern, High-Tolerance Build, Engineered for Long Service Life',
      date: '2026-01-01',
      status: 'Quote Ready'
    }
  ];

  const pendingCount = enquiries.filter(e => e.status === 'Quote Pending').length;
  const readyCount = enquiries.filter(e => e.status === 'Quote Ready').length;

  return (
    <div className="enquiries-container">
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
          <img src="/logoimg.png" alt="ShiaanX" className="topbar-logo-img" />
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src="/logoimg.png" alt="ShiaanX" className="sidebar-logo" />
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-item" onClick={() => { navigate('/home'); setSidebarOpen(false); }}>
            <FiHome size={20} />
            <span>Home</span>
          </div>
          
          <div className="nav-item active" onClick={() => { navigate('/enquiries'); setSidebarOpen(false); }}>
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
        <div className="page-header">
          <div className="header-left">
            <h1>My Enquiries</h1>
            <div className="enquiry-stats">
              <span>Quotes Pending: <strong>{pendingCount}</strong></span>
              <span className="stat-divider">|</span>
              <span>Quotes Ready: <strong>{readyCount}</strong></span>
            </div>
          </div>
          <div className="header-buttons">
            <button className="new-enquiry-btn">
              <FiMessageSquare size={18} />
              New Enquiry
            </button>
            <button className="new-issues-btn">
              <FiAlertCircle size={18} />
              Issues Raised
            </button>
          </div>
        </div>

        <div className="search-bar">
          <FiSearch size={20} color="#999" />
          <input type="text" placeholder="Search enquiries..." />
        </div>

        <div className="enquiries-list">
          {enquiries.map(enquiry => (
            <div key={enquiry.id} className="enquiry-card">
              <div className="enquiry-header">
                <h3>{enquiry.subject}</h3>
                <span
  className={`status-badge quote ${
    enquiry.status === 'Quote Ready' ? 'ready' : 'pending'
  }`}
>
  {enquiry.status}
</span>


              </div>
              <p className="enquiry-message">{enquiry.message}</p>
              <div className="enquiry-footer">
                <div className="footer-left">
                  <span className="enquiry-date">{enquiry.date}</span>
                </div>
                <button className="view-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>

        {enquiries.length === 0 && (
          <div className="empty-state">
            <FiMessageSquare size={64} color="#ccc" />
            <h3>No Enquiries Yet</h3>
            <p>You haven't made any enquiries yet. Start by creating one!</p>
            <button className="new-enquiry-btn">Create Enquiry</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Enquiries;
