import axios from 'axios';

const API_URL = 'http://localhost:5000/api/sales';

const createSale = async (saleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, saleData, config);
  return response.data;
};

const getSales = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const deleteSale = async (saleId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}${saleId}`, config);
  return response.data;
};

const saleService = {
  createSale,
  getSales,
  deleteSale,
};

export default saleService;
