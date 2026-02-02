


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiHome, FiShoppingBag, FiMessageSquare, FiUser, FiBell, FiSettings, FiMessageCircle } from 'react-icons/fi';
import '../styles/TrackOrder.css';

function TrackOrder() {
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

  return (
    <div className="track-order-container">
      {/* Top Navigation Bar */}
      <div className="topbar">
        <button className="menu-btn" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
        <h2 className="page-title">Orders/Timeline</h2>
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
          
          <div className="nav-item" onClick={() => { /* Add chat support logic */ }}>
            <FiMessageCircle size={20} />
            <span>Chat Support</span>
          </div>
        </nav>
      </div>

      {/* Overlay when sidebar is open */}
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Main Content */}
      <div className="main-content">
        <div className="item-id-section">
          <span className="item-label">Item ID:</span>
          <span className="item-value">#123456</span>
        </div>

        {/* Vendor Documents and Remarks Box */}
        <div className="split-box">
          <div className="split-left">
            <h3>Vendor Uploaded Documents (Click to View)</h3>

            <div className="document-item">
              <div className="document-link">&gt; abcdef.txt</div>
            
            </div>
            <div className="document-item">
              <div className="document-link">&gt; gefdgt.txt</div>
            </div>

          </div>
          <div className="divider"></div>
          <div className="split-right">
            <h3>Vendor Remarks</h3>
            <div className="remark-item">
              <p>Initial design approved. Proceeding with manufacturing.</p>
            </div>
            <div className="remark-item">
              <p>Quality inspection report attached. All parameters within tolerance. Ready for shipment.</p>
            </div>
          </div>
        </div>

        <div className="bottom-section">
          <div className="bottom-left">
            <div className="field-section">
              <label>Order placed on:</label>
              <div className="blue-box">11th Jan 2025</div>
            </div>
            <div className="field-section">
              <label>Status:</label>
              <div className="blue-box"><span className="status-pending">Pending</span></div>
            </div>
            <button className="view-timeline-btn">View Timeline</button>
          </div>
          <div className="bottom-right">
            <label>Current Step:</label>
            <div className="blue-box">Finishing & Quality Control</div>
          </div>
        </div>

        <div className="tip-section">
          <p>Tip: Orders/Timeline takes you to the latest updates/reports/status from the vendor. To see the information about the product itself (things that you entered), go to Orders/Details.</p>
        </div>
      </div>
    </div>
  );
}


export default TrackOrder;