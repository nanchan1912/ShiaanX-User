"use strict";

import api from './api';

const enquiryService = {
  getConfig: async () => {
    try {
      const response = await api.get('/customer/enquiries/config');
      return response.data || response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  getEnquiries: async (params = {}) => {
    try {
      const response = await api.get('/customer/enquiries', { params });
      return response.data || response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  getEnquiryDetails: async (id) => {
    try {
      const response = await api.get(`/customer/enquiries/${id}`);
      return response.data || response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  createEnquiry: async (data) => {
    try {
      const response = await api.post('/customer/enquiries', data);
      return response.data || response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  updateEnquiry: async (id, data) => {
    try {
      const response = await api.put(`/customer/enquiries/${id}`, data);
      return response.data || response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  addMessage: async (id, message) => {
    try {
      const response = await api.post(`/customer/enquiries/${id}/messages`, { message });
      return response.data || response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  uploadFiles: async (files) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('documents', files[i]);
      }
      const response = await api.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data || response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // This one remains for attaching to specific enquiry if needed, 
  // but we prefer common upload for flexibility
  uploadEnquiryDocuments: async (id, files) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('documents', files[i]);
      }
      const response = await api.post(`/customer/enquiries/${id}/documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data || response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  confirmEnquiry: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append('document', file);
      const response = await api.post(`/customer/enquiries/${id}/confirm`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data || response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
};

export default enquiryService;
