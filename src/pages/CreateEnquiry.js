import React from 'react';
import { useNavigate } from 'react-router-dom';
import EnquiryForm from '../components/forms/EnquiryForm';
import enquiryService from '../services/enquiryService';
import toast from 'react-hot-toast';

const CreateEnquiry = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({});

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

      const { documents, ...enquiryData } = formData;
      
      // 1. Create Enquiry
      const response = await enquiryService.createEnquiry(enquiryData);
      const enquiryId = response.id; 

      // 2. Upload Documents if any
      if (documents && documents.length > 0) {
        await enquiryService.uploadEnquiryDocuments(enquiryId, documents);
      }

      toast.success('Enquiry created successfully!');
      navigate('/enquiries');
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
        toast.error('Please fix the errors in the form');
      } else {
        toast.error(err.message || 'Failed to create enquiry');
      }
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate('/enquiries');
  };

  return (
    <div className="create-enquiry-page">
      <EnquiryForm 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
        errors={errors}
      />
    </div>
  );
};

export default CreateEnquiry;
