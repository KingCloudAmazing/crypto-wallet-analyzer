import express from 'express';
import {
  registerWallet,
  getWalletTransactions,
  analyzeWalletRisk,
  getAllAnalyses,
} from '../controllers/wallet.controller.js';

const router = express.Router();

// POST /api/wallet/register
router.post('/register', registerWallet);

// GET /api/wallet/transactions
router.get('/transactions', getWalletTransactions);

// GET /api/wallet/analyses
router.get('/analyses', getAllAnalyses);

// POST /api/wallet/analyze
router.post('/analyze', analyzeWalletRisk);

export default router;