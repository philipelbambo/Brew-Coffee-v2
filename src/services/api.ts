import axios from 'axios';

const API_BASE_URL = 'http://localhost/baofei-coffee/src/backend/api';

export const api = {
  async getProducts() {
    const response = await axios.get(`${API_BASE_URL}/products.php`);
    return response.data;
  },
  
  async createOrder(orderData: any) {
    const response = await axios.post(`${API_BASE_URL}/orders.php`, orderData);
    return response.data;
  },
  
  async getInventory() {
    const response = await axios.get(`${API_BASE_URL}/inventory.php`);
    return response.data;
  }
};

export default api;