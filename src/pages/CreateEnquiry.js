import React from 'react';
import { useNavigate } from 'react-router-dom';
import EnquiryForm from '../components/forms/EnquiryForm';
import enquiryService from '../services/enquiryService';
import toast from 'react-hot-toast';

const CreateEnquiry = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({});

  const handleSubmit = async (formData) => {
    try {
      setErrors({});
      
      const { documents, parts, ...restData } = formData;
      
      // Clean parts data (remove documents as it's handled separately)
      const cleanedParts = parts.map(({ documents, id, ...part }) => part);
      
      // 1. Create Enquiry
      const response = await enquiryService.createEnquiry({ ...restData, parts: cleanedParts });
      const enquiryId = response.id;
      const createdEnquiryItems = response.parts || [];

      // 2. Upload Documents if any
      // Handle overall enquiry documents (though the form currently doesn't have an overall upload, keeping it for robustness)
      if (documents && documents.length > 0) {
        await enquiryService.uploadEnquiryDocuments(enquiryId, documents);
      }

      // Handle part-specific documents
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part.documents && part.documents.length > 0) {
          // Find the corresponding created part ID in backend
          const createdPartId = createdEnquiryItems[i]?.id;
          if (createdPartId) {
            await enquiryService.uploadEnquiryDocuments(enquiryId, part.documents, createdPartId);
          }
        }
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
