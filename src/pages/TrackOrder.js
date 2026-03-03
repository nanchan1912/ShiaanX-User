import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiFile, FiCheckCircle } from 'react-icons/fi';
import orderService from '../services/orderService';
import toast from 'react-hot-toast';
import '../styles/TrackOrder.css';

function TrackOrder() {
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

  if (loading) return <div style={{ padding: '2rem' }}>Loading timeline...</div>;
  if (!order) return <div style={{ padding: '2rem' }}>Order not found</div>;

  return (
    <div className="track-order-content">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => navigate('/orders')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <FiArrowLeft size={24} />
        </button>
        <h2 className="page-title">Order Timeline</h2>
      </div>

      <div className="item-id-section">
        <span className="item-label">ORD #:</span>
        <span className="item-value">{order.order_number}</span>
      </div>

      <div className="split-box">
        <div className="split-left">
          <h3>Updates & Documents</h3>
          <div className="document-list" style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', backgroundColor: '#f8f9fa', borderRadius: '6px', marginBottom: '0.5rem' }}>
                  <FiClock size={18} color="#666" />
                  <span style={{ fontSize: '0.9rem' }}>Project started on {new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              {order.status === 'DELIVERED' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', backgroundColor: '#f0fff4', borderRadius: '6px', marginBottom: '0.5rem' }}>
                      <FiCheckCircle size={18} color="#38a169" />
                      <span style={{ fontSize: '0.9rem' }}>Order delivered successfully</span>
                  </div>
              )}
          </div>
        </div>
        <div className="divider"></div>
        <div className="split-right">
          <h3>Current Status</h3>
          <div className="remark-item" style={{ marginTop: '1rem' }}>
            <div className="blue-box" style={{ padding: '1rem', fontWeight: 600, fontSize: '1.1rem', textAlign: 'center' }}>
                {order.status.replace(/_/g, ' ')}
            </div>
            {order.tracking_number && (
                <p style={{ marginTop: '1rem', fontSize: '0.95rem' }}>
                    <strong>Tracking ID:</strong> {order.tracking_number}
                </p>
            )}
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Last updated: {new Date(order.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bottom-section" style={{ marginTop: '2rem' }}>
        <div className="bottom-left">
          <div className="field-section">
            <label>Expected Delivery:</label>
            <div className="blue-box">{order.expected_delivery_date ? new Date(order.expected_delivery_date).toLocaleDateString() : 'TBD'}</div>
          </div>
          <button className="view-timeline-btn" onClick={() => navigate(`/orders/${id}`)}>View Order Details</button>
        </div>
        <div className="bottom-right">
          <label>Technology:</label>
          <div className="blue-box">{order.processing_technology}</div>
        </div>
      </div>

      <div className="tip-section">
        <p>Tip: This timeline shows the latest updates from the processing team. For original design specs and remarks, check the Order Details.</p>
      </div>
    </div>
  );
}

export default TrackOrder;