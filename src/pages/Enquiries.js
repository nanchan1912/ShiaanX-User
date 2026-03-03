import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMessageSquare, FiSearch, FiAlertCircle, FiEdit2 } from 'react-icons/fi';
import enquiryService from '../services/enquiryService';
import toast from 'react-hot-toast';
import '../styles/Enquiries.css';

function Enquiries() {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ pending: 0, ready: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [meta, setMeta] = useState({ totalItems: 0, totalPages: 1 });

  useEffect(() => {
    fetchEnquiries();
  }, [page]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const response = await enquiryService.getEnquiries({ limit, offset });
      const items = response.items || [];
      const pagination = response.meta || { totalItems: 0, totalPages: 1 };

      setEnquiries(items);
      setMeta(pagination);
      
      setStats({
        pending: items.filter(e => e.status === 'pending').length,
        ready: items.filter(e => e.status === 'quoted').length
      });
    } catch (err) {
      toast.error(err.message || 'Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => 
    enquiry.enquiry_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading-container">Loading enquiries...</div>;
  }

  return (
    <div className="enquiries-content">
      <div className="page-header">
        <div className="header-left">
          <h1>My Enquiries</h1>
          <div className="enquiry-stats">
            <span>Quotes Pending: <strong>{stats.pending}</strong></span>
            <span className="stat-divider">|</span>
            <span>Quotes Ready: <strong>{stats.ready}</strong></span>
          </div>
        </div>
        <div className="header-buttons">
          <button className="new-enquiry-btn" onClick={() => navigate('/enquiries/new')}>
            <FiMessageSquare size={18} />
            New Enquiry
          </button>
          <button className="new-issues-btn">
            <FiAlertCircle size={18} />
            Issues Raised
          </button>
        </div>
      </div>

      <div className="search-bar">
        <FiSearch size={20} color="#999" />
        <input 
          type="text" 
          placeholder="Search enquiries by number..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="enquiries-list">
        {filteredEnquiries.length > 0 ? (
          filteredEnquiries.map(enquiry => (
            <div key={enquiry.id} className="enquiry-card">
              <div className="enquiry-header">
                <h3>Enquiry #{enquiry.enquiry_number}</h3>
                <span
                  className={`status-badge quote ${enquiry.status.toLowerCase()}`}
                >
                  {enquiry.status}
                </span>
              </div>
              <p className="enquiry-message">{enquiry.remarks || enquiry.message || 'No remarks provided'}</p>
              <div className="enquiry-footer">
                <div className="footer-left">
                  <span className="enquiry-date">{new Date(enquiry.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="footer-actions">
                  <button 
                    className="edit-btn" 
                    onClick={() => navigate(`/enquiries/edit/${enquiry.id}`)}
                    style={{ marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#2160b7' }}
                  >
                    <FiEdit2 size={18} /> Edit
                  </button>
                  <button 
                    className="view-btn"
                    onClick={() => navigate(`/enquiries/${enquiry.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <FiMessageSquare size={64} color="#ccc" />
            <h3>No Enquiries Yet</h3>
            <p>You haven't made any enquiries yet. Start by creating one!</p>
            <button className="new-enquiry-btn" onClick={() => navigate('/enquiries/new')}>Create Enquiry</button>
          </div>
        )}
      </div>

      {enquiries.length > 0 && (
        <div className="pagination">
          <button 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
            className="page-btn"
          >
            Previous
          </button>
          <span className="page-info">
            Page {page} of {meta.totalPages}
          </span>
          <button 
            disabled={page >= meta.totalPages} 
            onClick={() => setPage(page + 1)}
            className="page-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Enquiries;
