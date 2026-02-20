import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EnquiryForm from '../components/forms/EnquiryForm';
import enquiryService from '../services/enquiryService';
import toast from 'react-hot-toast';

const EditEnquiry = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const data = await enquiryService.getEnquiryDetails(id);
        setInitialData(data);
        setLoading(false);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch enquiry details');
        navigate('/enquiries');
      }
    };

    fetchEnquiry();
  }, [id, navigate]);

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.processing_technology) newErrors.processing_technology = 'Please select a processing technology';
    if (!data.material) newErrors.material = 'Please select a material';
    if (!data.finishes) newErrors.finishes = 'Please select a finish';
    if (!data.quantity || data.quantity < 1) newErrors.quantity = 'Quantity must be at least 1';
    if (!data.shipping_address || !data.shipping_address.trim()) newErrors.shipping_address = 'Shipping address is required';
    
    return newErrors;
  };

  const handleSubmit = async (formData) => {
    try {
      setErrors({});
      const validationErrors = validateForm(formData);
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        toast.error('Please fill in all required fields');
        return;
      }

      // Precisely filter fields to avoid validation errors for unknown fields
      const updateData = {
        processing_technology: formData.processing_technology,
        material: formData.material,
        finishes: formData.finishes,
        remarks: formData.remarks,
        quantity: formData.quantity,
        shipping_address: formData.shipping_address
      };

      await enquiryService.updateEnquiry(id, updateData);
      
      toast.success('Enquiry updated successfully!');
      navigate('/enquiries');
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
        toast.error('Please fix the errors in the form');
      } else {
        toast.error(err.message || 'Failed to update enquiry');
      }
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate('/enquiries');
  };

  if (loading) {
    return <div className="loading-container">Loading enquiry details...</div>;
  }

  return (
    <div className="edit-enquiry-page">
      <EnquiryForm 
        initialData={initialData}
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
        errors={errors}
        isEditMode={true}
      />
    </div>
  );
};

export default EditEnquiry;
