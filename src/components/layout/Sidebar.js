import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiMessageSquare, FiMessageCircle } from 'react-icons/fi';
import '../../styles/Home.css';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={process.env.PUBLIC_URL + '/logoimg.png'} alt="ShiaanX" className="sidebar-logo" />
        </div>
        
        <nav className="sidebar-nav">
          <div 
            className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}
            onClick={() => handleNavigation('/home')}
          >
            <FiHome size={20} />
            <span>Home</span>
          </div>
          
          <div 
            className={`nav-item ${location.pathname.startsWith('/enquiries') ? 'active' : ''}`}
            onClick={() => handleNavigation('/enquiries')}
          >
            <FiMessageSquare size={20} />
            <span>My Enquiries</span>
          </div>
          
          <div 
            className={`nav-item ${location.pathname.startsWith('/orders') ? 'active' : ''}`}
            onClick={() => handleNavigation('/orders')}
          >
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
      {isOpen && <div className="overlay" onClick={closeSidebar}></div>}
    </>
  );
};

export default Sidebar;
