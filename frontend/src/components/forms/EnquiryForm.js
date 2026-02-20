import React, { useState, useEffect } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import CustomDropdown from './CustomDropdown';
import enquiryService from '../../services/enquiryService';
import toast from 'react-hot-toast';
import '../../styles/EnquiryForm.css';

const EnquiryForm = ({ initialData, onSubmit, onCancel, errors = {}, isEditMode = false }) => {
  const [config, setConfig] = useState({
    PROCESSING_TECHNOLOGIES: [],
    MATERIALS: [],
    FINISHES: []
  });

  const [formData, setFormData] = useState({
    processing_technology: '',
    material: '',
    finishes: '',
    remarks: '',
    quantity: '',
    shipping_address: '',
    documents: [],
    ...initialData
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await enquiryService.getConfig();
        // response is unwrapped by interceptor: it is the "data" from responseManager
        setConfig(response);
      } catch (err) {
        toast.error('Failed to load form options');
        console.error(err);
      }
    };
    fetchConfig();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="enquiry-form-container">
      <h2 className="enquiry-form-title">{isEditMode ? 'Edit Enquiry' : 'Create New Enquiry'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Upload CAD Files / Drawings</label>
          <div className="file-upload-box" onClick={() => document.getElementById('file-upload').click()}>
            <FiUpload className="file-upload-icon" />
            <p>Click to upload files (STEP, STL, DXF, PDF)</p>
            <input
              type="file"
              id="file-upload"
              className="file-input"
              multiple
              onChange={handleFileChange}
            />
          </div>
          
          {formData.documents.length > 0 && (
            <div className="uploaded-files">
              {formData.documents.map((file, index) => (
                <span key={index} className="file-tag">
                  {file.name}
                  <FiX className="remove-file" onClick={() => removeFile(index)} />
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="form-row">
          <CustomDropdown 
            label="Processing Technology"
            name="processing_technology"
            value={formData.processing_technology}
            options={config.PROCESSING_TECHNOLOGIES}
            onChange={handleChange}
            placeholder="Select Technology"
            error={errors.processing_technology}
          />

          <CustomDropdown 
            label="Material"
            name="material"
            value={formData.material}
            options={config.MATERIALS}
            onChange={handleChange}
            placeholder="Select Material"
            error={errors.material}
          />
        </div>

        <div className="form-row">
          <CustomDropdown 
            label="Finishes"
            name="finishes"
            value={formData.finishes}
            options={config.FINISHES}
            onChange={handleChange}
            placeholder="Select Finish"
            error={errors.finishes}
          />

          <div className="form-group">
            <label htmlFor="quantity">Quantity (Units)</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className={`form-control ${errors.quantity ? 'error' : ''}`}
              value={formData.quantity}
              onChange={handleChange}
              min="1"
            />
            {errors.quantity && <span className="error-message">{errors.quantity}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="remarks">Remarks / Special Instructions</label>
          <textarea
            id="remarks"
            name="remarks"
            className={`form-control ${errors.remarks ? 'error' : ''}`}
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Any specific tolerances, surface roughness requirements, etc."
          ></textarea>
          {errors.remarks && <span className="error-message">{errors.remarks}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="shipping_address">Shipping Address</label>
          <textarea
            id="shipping_address"
            name="shipping_address"
            className={`form-control ${errors.shipping_address ? 'error' : ''}`}
            value={formData.shipping_address}
            onChange={handleChange}
            placeholder="Enter full shipping address"
          ></textarea>
          {errors.shipping_address && <span className="error-message">{errors.shipping_address}</span>}
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditMode ? 'Update Enquiry' : 'Submit Enquiry'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;
