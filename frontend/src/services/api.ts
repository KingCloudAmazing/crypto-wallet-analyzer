import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const walletService = {
  // Registers a wallet and performs initial sync
  registerWallet: async (data: { address: string; chainName: string; priority?: string }) => {
    try {
      const response = await api.post('/wallet/register', data);
      return response.data;
    } catch (error) {
      console.error("Failed to register wallet:", error);
      throw error;
    }
  },

  // Analyzes a wallet (Risk assessment)
  analyzeWalletRisk: async (data: { address: string; chain: string }) => {
    try {
      const response = await api.post('/wallet/analyze', data);
      return response.data;
    } catch (error) {
      console.error("Failed to analyze wallet risk:", error);
      throw error;
    }
  },

  // Get historical transactions
  getTransactions: async (params: { address: string; chainName: string; limit?: number }) => {
    try {
      const response = await api.get('/wallet/transactions', { params });
      return response.data;
    } catch (error) {
      console.error("Failed to get transactions:", error);
      throw error;
    }
  }
};

export default api;
