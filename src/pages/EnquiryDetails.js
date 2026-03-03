import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EnquiryInfo from '../components/enquiry/EnquiryInfo';
import EnquiryChat from '../components/enquiry/EnquiryChat';
import POUploadModal from '../components/enquiry/POUploadModal';
import enquiryService from '../services/enquiryService';
import toast from 'react-hot-toast';
import '../styles/EnquiryDetails.css';

const EnquiryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [enquiryData, setEnquiryData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const data = await enquiryService.getEnquiryDetails(id);
        setEnquiryData(data);
        setLoading(false);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch enquiry details');
        navigate('/enquiries');
      }
    };

    fetchEnquiry();
  }, [id, navigate]);

  const handlePOSubmit = async (file) => {
    try {
      setLoading(true);
      const updatedEnquiry = await enquiryService.confirmEnquiry(id, file);
      setEnquiryData(updatedEnquiry);
      setIsModalOpen(false);
      toast.success('PO Uploaded successfully! Awaiting admin verification.');
    } catch (err) {
      toast.error(err.message || 'Failed to upload PO');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/enquiries/edit/${id}`);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this enquiry? This action cannot be undone.')) {
      setEnquiryData(prev => ({
        ...prev,
        status: 'Cancelled'
      }));
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading enquiry details...</div>;
  }

  return (
    <div className="enquiry-details-container">
      <EnquiryInfo 
        data={enquiryData} 
        onConfirm={() => setIsModalOpen(true)}
        onEdit={handleEdit}
        onCancel={handleCancel}
      />
      <EnquiryChat 
        enquiryId={id} 
        initialMessages={enquiryData.messages} 
      />
      
      <POUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handlePOSubmit} 
      />
    </div>
  );
};

export default EnquiryDetails;
