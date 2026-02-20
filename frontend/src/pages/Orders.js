import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiPackage, FiTruck, FiSearch } from 'react-icons/fi';
import orderService from '../services/orderService';
import toast from 'react-hot-toast';
import '../styles/Orders.css';

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.list();
        setOrders(data.items || []);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'DELIVERED':
        return <FiPackage size={18} />;
      case 'SHIPPED':
      case 'IN_TRANSIT':
        return <FiTruck size={18} />;
      default:
        return <FiShoppingBag size={18} />;
    }
  };

  const filteredOrders = orders.filter(order => 
    order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.processing_technology?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    processing: orders.filter(o => o.status === 'PROCESSING').length,
    transit: orders.filter(o => o.status === 'IN_TRANSIT' || o.status === 'SHIPPED').length,
    delivered: orders.filter(o => o.status === 'DELIVERED').length
  };
  if (loading) return <div style={{ padding: '2rem' }}>Loading orders...</div>;

  return (
    <div className="orders-content">
      <div className="page-header">
        <h1>My Orders</h1>
      </div>

      <div className="search-bar">
        <FiSearch size={20} color="#999" />
        <input 
          type="text" 
          placeholder="Search orders by number or technology..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="orders-stats">
        <div className="stat-card">
          <div className="stat-icon processing">
            <FiShoppingBag size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.processing}</span>
            <span className="stat-label">Processing</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon transit">
            <FiTruck size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.transit}</span>
            <span className="stat-label">In Transit</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon delivered">
            <FiPackage size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.delivered}</span>
            <span className="stat-label">Delivered</span>
          </div>
        </div>
      </div>

      <div className="orders-list">
        {filteredOrders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-id-section">
                <span className="order-id">ORD #{order.order_number}</span>
                <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <span className={`status-badge ${order.status?.toLowerCase().replace(/_/g, '-')}`}>
                {getStatusIcon(order.status)}
                {order.status?.replace(/_/g, ' ')}
              </span>
            </div>
            
            <div className="order-details">
              <div className="product-info">
                <h3>{order.processing_technology || 'Custom Part'}</h3>
                <p>Quantity: {order.quantity}</p>
                <p className="tracking">Tracking: {order.tracking_number || 'N/A'}</p>
              </div>
              <div className="order-price">
                <span className="price-label">Total</span>
                <span className="price-value">₹{order.final_amount}</span>
              </div>
            </div>
            
            <div className="order-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
              <button 
                className="action-btn secondary" 
                onClick={() => navigate(`/orders/${order.id}/track`)}
                style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', border: '1px solid #ddd', backgroundColor: 'white' }}
              >
                Track Order
              </button>
              <button 
                className="action-btn primary" 
                onClick={() => navigate(`/orders/${order.id}`)}
                style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', border: 'none', backgroundColor: '#2160b7', color: 'white' }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="empty-state">
          <FiShoppingBag size={64} color="#ccc" />
          <h3>No Orders Found</h3>
          <p>{searchTerm ? 'No orders match your search criteria.' : "You haven't placed any orders yet."}</p>
        </div>
      )}
    </div>
  );
}

export default Orders;
