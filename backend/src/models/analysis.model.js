// backend/src/models/analysis.model.js
import { Schema, model } from 'mongoose';

const AnalysisSchema = new Schema({
  wallet: {
    type: String,
    required: true,
    index: true
  },
  chain: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  tier: {
    type: String,
    required: true
  },
  tx_count: {
    type: Number,
    default: 0
  },
  total_volume: {
    type: Number,
    default: 0
  },
  hhi: Number,
  gini: Number,
  temporal: Object,
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { 
  collection: 'analysisHistory', // Explicitly point to the collection used by Python server
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
});

AnalysisSchema.index({ wallet: 1, chain: 1 }, { unique: true });

export default model('Analysis', AnalysisSchema);
