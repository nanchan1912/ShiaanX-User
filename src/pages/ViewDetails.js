import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiHome, FiShoppingBag, FiMessageSquare, FiUser, FiBell, FiSettings, FiMessageCircle } from 'react-icons/fi';
import '../styles/ViewDetails.css';

function ViewDetails() {
  const navigate = useNavigate();

  return (
    <div className="view-details-content">
      <div className="page-header">
        <h2 className="page-title">Orders/Details</h2>
      </div>

      <div className="content-wrapper">
        {/* Left Column */}
        <div className="left-column">
          <div className="item-id-section">
            <span className="item-label">Item ID:</span>
            <span className="item-value">#123456</span>
          </div>

          <div className="field-section">
            <label>Processing Technology:</label>
            <div className="blue-box">CNC Machining</div>
          </div>

          <div className="field-section">
            <label>Material:</label>
            <div className="blue-box">Aluminum 6061</div>
          </div>

          <div className="field-section">
            <label>Finishes:</label>
            <div className="blue-box">Anodized Blue</div>
          </div>

          <div className="field-section">
            <label>Remarks:</label>
            <div className="blue-box">Please ensure tight tolerances on mounting holes. Quality inspection required.</div>
          </div>

          <div className="field-section">
            <label>Quantity:</label>
            <div className="blue-box">5 units</div>
          </div>

          <div className="order-info">
            <p>Order placed on: <strong>11th Jan 2025</strong></p>
          </div>

          <button className="view-timeline-btn">View Timeline</button>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="documents-box">
            <h3>Uploaded Documents (Click to View)</h3>
            <div className="document-link">&gt; abc.txt</div>
            <div className="document-link">&gt; gefdh.txt</div>
            <div className="document-link">&gt; 3rfggh.txt</div>
            <div className="document-link">&gt; 24f4tgh.txt</div>
            <div className="document-link">&gt; gwrdsfdh.txt</div>
          </div>

          <div className="field-section">
            <label>Shipping Address:</label>
            <div className="blue-box">
Plot No. 47, 3rd Floor,<br />
Industrial Estate Phase II,<br />
Near Metro Pillar 218, Okhla Industrial Area,<br />
New Delhi – 110020,<br />
Delhi, India</div>
          </div>

          <div className="field-section">
            <label>Bill / Extra Details:</label>
            <div className="blue-box">Rush order. Please expedite processing. Contact before dispatch.</div>
          </div>
        </div>
      </div>

      <div className="tip-section">
        <p>Tip: Orders/Details takes you to the information about the product itself (things that you entered). To view latest updates/reports/status from the vendor, go to Orders/Timeline.</p>
      </div>
    </div>
  );
}

export default ViewDetails;
