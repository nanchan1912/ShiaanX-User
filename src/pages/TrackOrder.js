import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiFileText, FiDownload, FiTruck } from 'react-icons/fi';
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

  // Combine status history and documents into events
  const events = [
    ...(order.statusHistory || []).map(h => ({ ...h, type: 'STATUS', date: new Date(h.createdAt) })),
    ...(order.enquiry?.documents || []).map(d => ({ ...d, type: 'DOCUMENT', date: new Date(d.createdAt) }))
  ].sort((a, b) => b.date - a.date);

  return (
    <div className="track-order-content" style={{ padding: '2rem' }}>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => navigate('/orders')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <FiArrowLeft size={24} />
        </button>
        <h2 className="page-title" style={{ margin: 0 }}>Order Timeline</h2>
      </div>

      <div className="item-id-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <span className="item-label">Order Number</span>
            <div className="item-value" style={{ marginTop: '0.25rem' }}>#{order.order_number}</div>
          </div>
          <div style={{ width: '1px', height: '30px', backgroundColor: 'var(--border)' }}></div>
          <div>
            <span className="item-label">Status</span>
            <div className="item-value" style={{ marginTop: '0.25rem', color: 'var(--primary)' }}>{order.status.replace(/_/g, ' ')}</div>
          </div>
        </div>
      </div>

      <div className="split-box" style={{ display: 'flex', marginTop: '2.5rem' }}>
        <div className="split-left" style={{ flex: '1.2' }}>
          <h3>Order Journey</h3>
          <div className="timeline-container">
              {events.length > 0 ? (
                  events.map((event, index) => (
                      <div key={event.id || index} className="timeline-item" style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}>
                          {index !== events.length - 1 && (
                              <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '-24px', width: '2px', background: 'var(--border)' }}></div>
                          )}
                          <div className="timeline-marker" style={{ 
                              width: '24px', 
                              height: '24px', 
                              borderRadius: '50%', 
                              backgroundColor: event.type === 'STATUS' ? 'var(--primary)' : '#10b981', 
                              border: `6px solid ${event.type === 'STATUS' ? 'var(--primary-light)' : '#d1fae5'}`, 
                              zIndex: 1, 
                              marginTop: '2px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                          }}>
                          </div>
                          <div className="timeline-content" style={{ flex: 1, paddingBottom: '2.5rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                      {event.type === 'STATUS' ? <FiClock size={14} color="var(--primary)" /> : <FiFileText size={14} color="#059669" />}
                                      <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>
                                          {event.type === 'STATUS' ? event.to_status.replace(/_/g, ' ') : `Document: ${event.file_name}`}
                                      </span>
                                  </div>
                                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                                      {event.date.toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                  </span>
                              </div>
                              
                              {event.type === 'STATUS' ? (
                                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{event.change_reason || 'Status updated by system'}</p>
                              ) : (
                                  <div style={{ marginTop: '0.75rem' }}>
                                      <button 
                                          className="blue-box" 
                                          onClick={() => window.open(event.file_path.startsWith('http') ? event.file_path : (event.file_url || `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/${event.file_path}`), '_blank')}
                                          style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer', border: 'none', background: '#f0fdf4', color: '#166534', fontWeight: 700 }}
                                      >
                                          <FiDownload size={14} /> View Document
                                      </button>
                                  </div>
                              )}
                          </div>
                      </div>
                  ))
              ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', backgroundColor: 'var(--background)', borderRadius: '12px' }}>
                      <FiClock size={20} color="var(--primary)" />
                      <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>No project updates recorded yet.</span>
                  </div>
              )}
          </div>
        </div>
        
        <div className="split-right" style={{ flex: '0.8' }}>
          <h3>Current Progress</h3>
          <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #1a4d94 100%)', color: 'white', padding: '2rem', borderRadius: '20px', textAlign: 'center', boxShadow: '0 8px 16px rgba(33, 96, 183, 0.15)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.8, marginBottom: '0.5rem', letterSpacing: '0.1em' }}>Actual Status</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{order.status.replace(/_/g, ' ')}</div>
          </div>
          
          <div style={{ marginTop: '2.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem', display: 'block' }}>Logistics Tracking</label>
              <div className="blue-box" style={{ padding: '1.25rem', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FiTruck size={20} color="var(--primary)" />
                  {order.tracking_number || 'Awaiting tracking ID'}
              </div>
          </div>

          <div className="tip-section">
              <p>Tip: This timeline reflects the real-time processing of your project. For technical specifications and design notes, please refer to the Order Details page.</p>
          </div>
        </div>
      </div>

      <div className="bottom-section" style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem' }}>
        <div className="bottom-left">
          <div className="field-section">
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>Expected Delivery Window</label>
            <div className="blue-box" style={{ padding: '1.25rem', fontWeight: 600 }}>
                {order.expected_delivery_date ? new Date(order.expected_delivery_date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : 'To be determined'}
            </div>
          </div>
          <button 
            className="view-timeline-btn" 
            onClick={() => navigate(`/orders/${id}`)}
            style={{ marginTop: '1.5rem', width: '100%' }}
          >
            Go to Full Specifications
          </button>
        </div>
        <div className="bottom-right">
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>Technical Method</label>
          <div className="blue-box" style={{ padding: '1.25rem', fontWeight: 600 }}>
              {order.processing_technology || 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;