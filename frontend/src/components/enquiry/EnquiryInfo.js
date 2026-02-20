import React from 'react';
import { FiPaperclip } from 'react-icons/fi';

const EnquiryInfo = ({ data, onConfirm, onEdit, onCancel }) => {
  if (!data) return <div>Loading...</div>;

  return (
    <div className="enquiry-info-panel">
      <div className="info-header">
        <div className="header-top-row">
          <h2 className="info-title">Enquiry #{data.enquiry_number}</h2>
          <div className="header-actions">
            {!['CANCELLED', 'PO_UPLOADED', 'ORDER_GENERATED'].includes(data.status) && (
              <>
                <button className="btn-secondary-action" onClick={onEdit}>Edit</button>
                {['PENDING', 'PO_REJECTED'].includes(data.status) && (
                  <button className="confirm-order-btn" onClick={onConfirm}>
                    Confirm Order
                  </button>
                )}
                <button className="btn-cancel-action" onClick={onCancel}>Cancel</button>
              </>
            )}
          </div>
        </div>
        <div className="header-status-row">
          <span className={`status-badge ${data.status.toLowerCase()}`}>
            {data.status.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-item">
          <label>Created Date</label>
          <p>{new Date(data.created_at).toLocaleDateString()}</p>
        </div>

        <div className="info-item">
          <label>Processing Technology</label>
          <p>{data.processing_technology}</p>
        </div>
        <div className="info-item">
          <label>Material</label>
          <p>{data.material}</p>
        </div>

        <div className="info-item">
          <label>Finish</label>
          <p>{data.finishes}</p>
        </div>
        <div className="info-item">
          <label>Quantity</label>
          <p>{data.quantity} Units</p>
        </div>

        <div className="info-item full-width">
          <label>Remarks</label>
          <p>{data.remarks || 'No remarks provided.'}</p>
        </div>

        <div className="info-item full-width">
          <label>Shipping Address</label>
          <p style={{ whiteSpace: 'pre-line' }}>{data.shipping_address}</p>
        </div>

        <div className="info-item full-width">
          <label>Attached Files</label>
          <div className="info-files">
            {data.files && data.files.length > 0 ? (
              data.files.map((file, index) => (
                <div key={index} className="file-chip">
                  <FiPaperclip size={14} style={{ marginRight: '6px' }} />
                  {file.name}
                </div>
              ))
            ) : (
              <p style={{ color: '#a0aec0', fontStyle: 'italic' }}>No files uploaded</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryInfo;
