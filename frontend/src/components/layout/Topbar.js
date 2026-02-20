import React, { useState } from 'react';
import { FiMenu, FiUser, FiBell, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Home.css'; // We'll eventually want to separate styles, but keeping this for now

const Topbar = ({ toggleSidebar }) => { // Accept toggleSidebar prop
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
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
  );
};

export default Topbar;
