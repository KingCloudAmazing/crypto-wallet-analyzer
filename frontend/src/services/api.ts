import axios from 'axios';

// The API URL should be set via VITE_API_URL environment variable.
// In Docker, this is http://localhost:5000/api.
// Locally, it defaults to the same.
const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface RiskAnalysisResult {
  wallet: string;
  chain: string;
  score: number;
  tier: string;
  hhi: number;
  gini: number;
  tx_count: number;
  total_volume: number;
  syncStatus?: string;
  message?: string;
}

export const walletService = {
  // Registers a wallet and performs initial sync
  registerWallet: async (data: { address: string; chain: string; priority?: string }) => {
    try {
      const response = await api.post('/wallet/register', data);
      return response.data;
    } catch (error) {
      console.error("Failed to register wallet:", error);
      throw error;
    }
  },

  // Analyzes a wallet (Risk assessment)
  analyzeWalletRisk: async (data: { address: string; chain: string }): Promise<RiskAnalysisResult> => {
    try {
      const response = await api.post('/wallet/analyze', data);
      return response.data;
    } catch (error) {
      console.error("Failed to analyze wallet risk:", error);
      throw error;
    }
  },

  // Get historical transactions
  getTransactions: async (params: { address: string; chain: string; limit?: number }) => {
    try {
      const response = await api.get('/wallet/transactions', { params });
      return response.data;
    } catch (error) {
      console.error("Failed to get transactions:", error);
      throw error;
    }
  },

  // Get all analysis results (history)
  getAllAnalyses: async (): Promise<RiskAnalysisResult[]> => {
    try {
      const response = await api.get('/wallet/analyses');
      return response.data;
    } catch (error) {
      console.error("Failed to fetch scan history:", error);
      throw error;
    }
  }
};

export default api;
