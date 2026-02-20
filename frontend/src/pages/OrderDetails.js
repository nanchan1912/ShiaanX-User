import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShoppingBag, FiTruck, FiPackage, FiFile } from 'react-icons/fi';
import orderService from '../services/orderService';
import toast from 'react-hot-toast';
import '../styles/ViewDetails.css';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await orderService.getDetails(id);
        setOrder(data);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch order details');
        navigate('/orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id, navigate]);

  if (loading) return <div style={{ padding: '2rem' }}>Loading order details...</div>;
  if (!order) return <div style={{ padding: '2rem' }}>Order not found</div>;

  const enquiry = order.enquiry || {};

  return (
    <div className="view-details-content">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => navigate('/orders')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <FiArrowLeft size={24} />
        </button>
        <h2 className="page-title">Order # {order.order_number}</h2>
      </div>

      <div className="content-wrapper">
        {/* Left Column */}
        <div className="left-column">
          <div className="item-id-section">
            <span className="item-label">Status:</span>
            <span className={`status-badge ${order.status.toLowerCase().replace(/_/g, '-')}`} style={{ 
                padding: '0.4rem 1rem', 
                borderRadius: '9999px', 
                fontSize: '0.85rem', 
                fontWeight: 700,
                backgroundColor: '#e0edff',
                color: '#2160b7',
                marginLeft: '1rem'
            }}>
              {order.status.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="field-section">
            <label>Processing Technology:</label>
            <div className="blue-box">{order.processing_technology || 'N/A'}</div>
          </div>

          <div className="field-section">
            <label>Material:</label>
            <div className="blue-box">{order.material || 'N/A'}</div>
          </div>

          <div className="field-section">
            <label>Finishes:</label>
            <div className="blue-box">{order.finishes || 'None'}</div>
          </div>

          <div className="field-section">
            <label>Quantity:</label>
            <div className="blue-box">{order.quantity} units</div>
          </div>

          <div className="field-section">
            <label>Remarks:</label>
            <div className="blue-box">{enquiry.remarks || 'No remarks'}</div>
          </div>

          <div className="order-info">
            <p>Order placed on: <strong>{new Date(order.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</strong></p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="view-timeline-btn" onClick={() => navigate(`/orders/${id}/track`)}>Track Timeline</button>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="documents-box">
            <h3>Documents</h3>
            {enquiry.documents && enquiry.documents.length > 0 ? (
                enquiry.documents.map((doc, index) => (
                    <div key={index} className="document-link" onClick={() => window.open(doc.file_url, '_blank')}>
                        &gt; {doc.file_name}
                    </div>
                ))
            ) : (
                <p style={{ fontSize: '0.9rem', color: '#666', padding: '0.5rem' }}>No documents uploaded</p>
            )}
            
            {order.po_document_url && (
                <div className="document-link" style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '0.5rem' }} onClick={() => window.open(order.po_document_url, '_blank')}>
                    &gt; Purchase Order (PO)
                </div>
            )}
          </div>

          <div className="field-section">
            <label>Shipping Address:</label>
            <div className="blue-box">
                {order.shipping_address || 'Address not provided'}
            </div>
          </div>

          <div className="field-section">
            <label>Payment Summary:</label>
            <div className="blue-box" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Amount:</span>
                    <span>₹{order.total_amount || 0}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Tax/Extra:</span>
                    <span>₹{(parseFloat(order.tax_amount || 0) - parseFloat(order.discount_amount || 0)).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ddd', paddingTop: '0.5rem', fontWeight: 700 }}>
                    <span>Total:</span>
                    <span>₹{order.final_amount}</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;