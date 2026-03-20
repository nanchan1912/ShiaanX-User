import React, { useState, useEffect } from 'react';
import { FiUpload, FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import MultiSelectDropdown from './MultiSelectDropdown';
import enquiryService from '../../services/enquiryService';
import toast from 'react-hot-toast';
import '../../styles/EnquiryForm.css';

const EnquiryForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  errors = {}, 
  isEditMode = false 
}) => {
  const [config, setConfig] = useState({
    PROCESSING_TECHNOLOGIES: [],
    MATERIALS: [],
    FINISHES: []
  });

  const [formData, setFormData] = useState({
    remarks: '',
    shipping_address: '',
    parts: [
      {
        id: Date.now(),
        part_name: '',
        quantity: 1,
        remarks: '',
        technology_ids: [],
        material_ids: [],
        finish_ids: [],
        documents: []
      }
    ],
    ...initialData
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await enquiryService.getConfig();
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

  const handlePartChange = (partId, field, value) => {
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.map(part => 
        part.id === partId ? { ...part, [field]: value } : part
      )
    }));
  };

  const addPart = () => {
    setFormData(prev => ({
      ...prev,
      parts: [
        ...prev.parts,
        {
          id: Date.now(),
          part_name: '',
          quantity: 1,
          remarks: '',
          technology_ids: [],
          material_ids: [],
          finish_ids: [],
          documents: []
        }
      ]
    }));
  };

  const removePart = (partId) => {
    if (formData.parts.length === 1) {
      toast.error('At least one part is required');
      return;
    }
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.filter(p => p.id !== partId)
    }));
  };

  const handlePartFileChange = (partId, e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.map(part => 
        part.id === partId ? { ...part, documents: [...part.documents, ...files] } : part
      )
    }));
  };

  const removePartFile = (partId, fileIndex) => {
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.map(part => 
        part.id === partId 
          ? { ...part, documents: part.documents.filter((_, i) => i !== fileIndex) } 
          : part
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Frontend validation
    if (!formData.shipping_address || !formData.shipping_address.trim()) {
      toast.error('Shipping address is required');
      return;
    }

    const invalidPart = formData.parts.find(p => !p.part_name);
    if (invalidPart) {
      toast.error('Please provide a name for all parts');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="enquiry-form-container" style={{ maxWidth: '1000px' }}>
      <h2 className="enquiry-form-title">{isEditMode ? 'Edit Enquiry' : 'Create New Enquiry'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="parts-container">
          {formData.parts.map((part, index) => (
            <div key={part.id} className="part-section">
              <div className="part-header">
                <h3>Part #{index + 1}</h3>
                <button type="button" className="remove-part-btn" onClick={() => removePart(part.id)}>
                  <FiTrash2 /> Remove Part
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Part Name / ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Enclosure Box"
                    value={part.part_name}
                    onChange={(e) => handlePartChange(part.id, 'part_name', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={part.quantity}
                    onChange={(e) => handlePartChange(part.id, 'quantity', e.target.value)}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <MultiSelectDropdown 
                  label="Processing Technologies"
                  name={`tech_${part.id}`}
                  value={part.technology_ids}
                  options={config.PROCESSING_TECHNOLOGIES || []}
                  onChange={(e) => handlePartChange(part.id, 'technology_ids', e.target.value)}
                  placeholder="Select Technologies"
                  isObject={true}
                />

                <MultiSelectDropdown 
                  label="Materials"
                  name={`mat_${part.id}`}
                  value={part.material_ids}
                  options={config.MATERIALS || []}
                  onChange={(e) => handlePartChange(part.id, 'material_ids', e.target.value)}
                  placeholder="Select Materials"
                  isObject={true}
                />
              </div>

              <div className="form-row">
                <MultiSelectDropdown 
                  label="Finishes"
                  name={`fin_${part.id}`}
                  value={part.finish_ids}
                  options={config.FINISHES || []}
                  onChange={(e) => handlePartChange(part.id, 'finish_ids', e.target.value)}
                  placeholder="Select Finishes"
                  isObject={true}
                />
                
                <div className="form-group">
                  <label>Part Remarks</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tolerances, threads, etc."
                    value={part.remarks}
                    onChange={(e) => handlePartChange(part.id, 'remarks', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Upload Part Documents (CAD / Drawings)</label>
                <div className="file-upload-box" onClick={() => document.getElementById(`file-upload-${part.id}`).click()}>
                  <FiUpload className="file-upload-icon" />
                  <p>Click to upload files for this part</p>
                  <input
                    type="file"
                    id={`file-upload-${part.id}`}
                    className="file-input"
                    multiple
                    onChange={(e) => handlePartFileChange(part.id, e)}
                  />
                </div>
                
                {part.documents.length > 0 && (
                  <div className="uploaded-files">
                    {part.documents.map((file, fIndex) => (
                      <span key={fIndex} className="file-tag">
                        {file.name}
                        <FiX className="remove-file" onClick={() => removePartFile(part.id, fIndex)} />
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <button type="button" className="add-part-btn" onClick={addPart}>
            <FiPlus /> Add Another Part
          </button>
        </div>

        <div className="form-group" style={{ marginTop: '2rem' }}>
          <label htmlFor="remarks">Overall Enquiry Remarks</label>
          <textarea
            id="remarks"
            name="remarks"
            className="form-control"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="General instructions for the entire order..."
          ></textarea>
        </div>

        <div className="form-group">
            <label htmlFor="shipping_address">Shipping Address</label>
            <textarea
                id="shipping_address"
                name="shipping_address"
                className={`form-control ${errors.shipping_address ? 'error' : ''}`}
                value={formData.shipping_address}
                onChange={handleChange}
                placeholder="Where should we deliver? (Enter full shipping address)"
                style={{ minHeight: '120px' }}
                required
            ></textarea>
            {errors.shipping_address && <span className="error-message">{errors.shipping_address}</span>}
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditMode ? 'Update Enquiry' : 'Create Enquiry'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;
