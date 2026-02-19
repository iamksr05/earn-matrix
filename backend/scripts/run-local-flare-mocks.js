// scripts/run-local-flare-mocks.js
// Mock servers for FTSO and FDC (for local testing)

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.MOCK_PORT || 4000;

// Mock FTSO Oracle
app.get('/mock/ftso/price/:symbol', (req, res) => {
  const { symbol } = req.params;
  const mockPrices = {
    FLR: { price: 0.01, timestamp: Date.now() },
    BTC: { price: 45000, timestamp: Date.now() },
    XRP: { price: 0.5, timestamp: Date.now() },
    ETH: { price: 2500, timestamp: Date.now() },
  };
  
  const priceData = mockPrices[symbol.toUpperCase()] || { price: 1, timestamp: Date.now() };
  res.json(priceData);
});

// Mock FDC Endpoint
app.post('/mock/fdc/verify', (req, res) => {
  const { conditionHash, proofData } = req.body;
  
  // Mock verification (always succeeds)
  res.json({
    verified: true,
    conditionHash,
    timestamp: Date.now(),
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'mock-flare-services' });
});

app.listen(PORT, () => {
  console.log(`🔮 Flare Mock Services running on port ${PORT}`);
  console.log(`   Mock FTSO: GET /mock/ftso/price/:symbol`);
  console.log(`   Mock FDC: POST /mock/fdc/verify`);
});

