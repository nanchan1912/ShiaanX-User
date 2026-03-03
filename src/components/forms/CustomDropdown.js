import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import '../../styles/EnquiryForm.css';

const CustomDropdown = ({ label, options, value, onChange, placeholder, name, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  };

  return (
    <div className="form-group" ref={dropdownRef}>
      <label>{label}</label>
      <div className={`custom-dropdown ${isOpen ? 'open' : ''} ${error ? 'error' : ''}`}>
        <div className="dropdown-selected" onClick={() => setIsOpen(!isOpen)}>
          <span>{value || placeholder}</span>
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        
        {isOpen && (
          <div className="dropdown-options">
            {options.map((option) => (
              <div 
                key={option} 
                className={`dropdown-option ${value === option ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default CustomDropdown;
