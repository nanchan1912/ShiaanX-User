import React, { useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import '../../styles/EnquiryDetails.css'; // Ensure we use the shared styles

const POUploadModal = ({ isOpen, onClose, onSubmit }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = () => {
    if (!file) {
      setError('Please upload a PO file to proceed.');
      return;
    }
    onSubmit(file);
    setFile(null); // Reset after submit
  };

  const handleOverlayClick = (e) => {
      if(e.target === e.currentTarget) {
          onClose();
      }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Confirm Order</h3>
          <button className="close-btn" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          <p className="modal-instruction">
            Please upload your official Purchase Order (PO) to confirm this enquiry. 
            Once verified by our admin, the order will be processed.
          </p>
          
          <div 
            className={`file-upload-box ${error ? 'error' : ''}`} 
            onClick={() => document.getElementById('po-upload').click()}
          >
            <FiUpload className="upload-icon" />
            <p>{file ? file.name : 'Click to Upload PO (PDF, DOCX)'}</p>
            <input 
              type="file" 
              id="po-upload" 
              className="hidden-input" 
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-confirm" onClick={handleSubmit}>Submit PO</button>
        </div>
      </div>
    </div>
  );
};

export default POUploadModal;
