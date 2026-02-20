import api from './api';

const orderService = {
  list: async (params = {}) => {
    try {
      const response = await api.get('/customer/orders', { params });
      return response.data || response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  getDetails: async (id) => {
    try {
      const response = await api.get(`/customer/orders/${id}`);
      return response.data || response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
};

export default orderService;
