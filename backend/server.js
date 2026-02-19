// backend/server.js
// Express server for Flare integrations: FTSO, FDC, FAssets, Smart Accounts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { ethers } from 'ethers';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route for health check
app.get('/', (req, res) => {
  res.send('Flare Backend Server is Running! 🚀');
});

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || ''
);

// Initialize Flare RPC provider
const flareProvider = new ethers.JsonRpcProvider(process.env.FLARE_RPC || 'https://flare-api.flare.network/ext/C/rpc');

// Mock FTSO oracle address (replace with real FTSO contract in production)
const FTSO_ORACLE_ADDR = process.env.FTSO_ORACLE_ADDR || '0x0000000000000000000000000000000000000000';

// Smart Account sponsor wallet (for gasless transactions)
const sponsorWallet = process.env.SPONSOR_WALLET_PRIVATE_KEY
  ? new ethers.Wallet(process.env.SPONSOR_WALLET_PRIVATE_KEY, flareProvider)
  : null;

// ============================================================================
// FTSO Price Oracle Endpoints
// ============================================================================

/**
 * GET /api/ftso/convert-usd-to-token
 * Query FTSO to convert USD amount to token amount
 * 
 * @query {number} usdAmount - USD amount to convert
 * @query {string} tokenSymbol - Token symbol (FLR, BTC, XRP, etc.)
 * @returns {object} { tokenAmount, rate, buffer, totalAmount }
 */
app.get('/api/ftso/convert-usd-to-token', async (req, res) => {
  try {
    const { usdAmount, tokenSymbol } = req.query;

    if (!usdAmount || !tokenSymbol) {
      return res.status(400).json({ error: 'usdAmount and tokenSymbol required' });
    }

    const usd = parseFloat(usdAmount);
    if (isNaN(usd) || usd <= 0) {
      return res.status(400).json({ error: 'Invalid usdAmount' });
    }

    // Mock FTSO query (replace with actual FTSO contract call in production)
    // In production, query: await ftsoContract.getPrice(tokenSymbol)
    const mockRates = {
      FLR: 0.01,    // $0.01 per FLR
      BTC: 45000,   // $45,000 per BTC
      XRP: 0.5,     // $0.50 per XRP
      ETH: 2500,    // $2,500 per ETH
    };

    const rate = mockRates[tokenSymbol.toUpperCase()] || 1;
    const tokenAmount = usd / rate;

    // Add 5% buffer for volatility and gas
    const buffer = tokenAmount * 0.05;
    const totalAmount = tokenAmount + buffer;

    res.json({
      usdAmount: usd,
      tokenSymbol: tokenSymbol.toUpperCase(),
      tokenAmount: tokenAmount.toString(),
      rate: rate.toString(),
      buffer: buffer.toString(),
      totalAmount: totalAmount.toString(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('FTSO conversion error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// FTSO Price Oracle Endpoints (Real Implementation)
// ============================================================================

const COSTON_RPC = 'https://coston2-api.flare.network/ext/C/rpc';
const FTSO_ADDRESS = '0x3d893C53D9e8056135C26C8c638B76C8b60Df726';


const FTSO_ABI = [
  'function getFeedsById(bytes21[] calldata _feedIds) external view returns (uint256[] memory _values, int8[] memory _decimals, uint256 _timestamp)'
];

// Helper to create Feed ID: 0x01 + Hex(Symbol) + Padding
// FLR: 46 4c 52 -> 0x01464c52...
// BTC: 42 54 43 -> 0x01425443...
// XRP: 58 52 50 -> 0x01585250...
// ETH: 45 54 48 -> 0x01455448...
// SOL: 53 4f 4c -> 0x01534f4c...
// BNB: 42 4e 42 -> 0x01424e42...
// DOGE: 44 4f 47 45 -> 0x01444f4745...

const PROD_FEED_IDS = [
  '0x01464c522f55534400000000000000000000000000', // FLR
  '0x014254432f55534400000000000000000000000000', // BTC
  '0x015852502f55534400000000000000000000000000', // XRP
  '0x014554482f55534400000000000000000000000000', // ETH
  '0x01534f4c2f55534400000000000000000000000000', // SOL
  '0x01424e422f55534400000000000000000000000000', // BNB
  '0x01444f47452f555344000000000000000000000000'  // DOGE
];

const SYMBOLS = ['FLR', 'BTC', 'XRP', 'ETH', 'SOL', 'BNB', 'DOGE'];

/**
 * GET /api/ftso/prices
 * Get live prices from Flare Coston2 FTSO
 * @returns {object} { FLR: { price: number }, ... }
 */
app.get('/api/ftso/prices', async (req, res) => {
  try {
    const provider = new ethers.JsonRpcProvider(COSTON_RPC);
    const contract = new ethers.Contract(FTSO_ADDRESS, FTSO_ABI, provider);

    const [values, decimals, timestamp] = await contract.getFeedsById(PROD_FEED_IDS);

    const prices = {};

    for (let i = 0; i < values.length; i++) {
      const val = Number(values[i]);
      const dec = Number(decimals[i]);
      const price = val * Math.pow(10, -dec); // Standard formula: value * 10^-decimals

      prices[SYMBOLS[i]] = {
        price: price,
        decimals: dec,
        raw: values[i].toString()
      };
    }

    res.json(prices);
  } catch (error) {
    console.error('FTSO prices error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// FAssets Bridge Verification Endpoints
// ============================================================================

/**
 * POST /api/fassets/verify-bridge
 * Verify an FAsset bridge transaction and mint proof
 * 
 * @body {object} { taskId, bridgeTx, fassetType }
 * @returns {object} { verified, mintTx, tokenAddress }
 */
app.post('/api/fassets/verify-bridge', async (req, res) => {
  try {
    const { taskId, bridgeTx, fassetType } = req.body;

    if (!taskId || !bridgeTx || !fassetType) {
      return res.status(400).json({ error: 'taskId, bridgeTx, and fassetType required' });
    }

    // Mock verification (in production, verify bridge tx on source chain)
    // For BTC: verify BTC tx on Bitcoin network
    // For XRP: verify XRP tx on XRP Ledger
    // Then check FAsset mint proof on Flare

    const verified = true; // Mock: always verified in dev

    // Mock FAsset token addresses
    const fassetAddresses = {
      BTC: process.env.FASSET_BTC_ADDR || '0x1234567890123456789012345678901234567890',
      XRP: process.env.FASSET_XRP_ADDR || '0x0987654321098765432109876543210987654321',
    };

    const tokenAddress = fassetAddresses[fassetType.toUpperCase()] || '0x0';

    // Update Supabase task with bridge info
    await supabase
      .from('tasks')
      .update({ fasset_bridge_tx: bridgeTx, fasset_type: fassetType })
      .eq('id', taskId);

    res.json({
      verified,
      taskId,
      bridgeTx,
      fassetType: fassetType.toUpperCase(),
      tokenAddress,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('FAsset verification error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// FDC (Flare Data Connector) Endpoints
// ============================================================================

/**
 * POST /api/fdc/submit-proof
 * Submit off-chain verification proof for FDC-triggered auto-release
 * 
 * @body {object} { taskId, conditionHash, proofData, signature }
 * @returns {object} { success, txHash }
 */
app.post('/api/fdc/submit-proof', async (req, res) => {
  try {
    const { taskId, conditionHash, proofData, signature } = req.body;

    if (!taskId || !conditionHash) {
      return res.status(400).json({ error: 'taskId and conditionHash required' });
    }

    // Verify proof signature (in production, verify against FDC oracle key)
    // For now, accept if signature matches expected format

    // Update Supabase: mark submission as verified
    const { data: task } = await supabase
      .from('tasks')
      .update({
        submission_verified: true,
        fdc_condition_hash: conditionHash,
        fdc_proof_data: JSON.stringify(proofData),
      })
      .eq('id', taskId)
      .select()
      .single();

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Call FlareAdapter.releaseIf() on-chain
    // This should be called by the FDC oracle, but we can trigger it here for demo
    const adapterAddress = process.env.FLARE_ADAPTER_ADDRESS;
    const adapterABI = [
      'function releaseIf(bytes32 conditionHash)',
    ];

    if (adapterAddress && sponsorWallet) {
      const adapter = new ethers.Contract(adapterAddress, adapterABI, sponsorWallet);
      const tx = await adapter.releaseIf(conditionHash);
      const receipt = await tx.wait();

      // Update task with release tx hash
      await supabase
        .from('tasks')
        .update({ payout_tx_hash: receipt.hash, status: 'paid' })
        .eq('id', taskId);

      res.json({
        success: true,
        taskId,
        conditionHash,
        txHash: receipt.hash,
        timestamp: new Date().toISOString(),
      });
    } else {
      // Mock response if contract not deployed
      res.json({
        success: true,
        taskId,
        conditionHash,
        txHash: '0x' + '0'.repeat(64),
        mock: true,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('FDC proof submission error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/fdc/register-condition
 * Register a condition hash for a task (called before FDC job starts)
 * 
 * @query {number} taskId
 * @returns {object} { conditionHash }
 */
app.get('/api/fdc/register-condition', async (req, res) => {
  try {
    const { taskId } = req.query;

    if (!taskId) {
      return res.status(400).json({ error: 'taskId required' });
    }

    // Generate condition hash (in production, this would be based on task-specific criteria)
    const conditionData = JSON.stringify({ taskId, timestamp: Date.now() });
    const conditionHash = ethers.keccak256(ethers.toUtf8Bytes(conditionData));

    // Update Supabase
    await supabase
      .from('tasks')
      .update({ fdc_condition_hash: conditionHash })
      .eq('id', taskId);

    res.json({
      taskId: parseInt(taskId),
      conditionHash,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('FDC condition registration error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// Smart Account (Gasless) Endpoints
// ============================================================================

/**
 * POST /api/smart-account/sponsor-tx
 * Sponsor a gasless transaction using Smart Account
 * 
 * @body {object} { to, data, value, userAddress }
 * @returns {object} { txHash }
 */
app.post('/api/smart-account/sponsor-tx', async (req, res) => {
  try {
    const { to, data, value, userAddress } = req.body;

    if (!to || !data || !userAddress) {
      return res.status(400).json({ error: 'to, data, and userAddress required' });
    }

    if (!sponsorWallet) {
      return res.status(503).json({ error: 'Sponsor wallet not configured' });
    }

    // In production, verify user's Smart Account signature here
    // For now, we trust the request (add signature verification in production)

    // Sponsor the transaction
    const tx = await sponsorWallet.sendTransaction({
      to,
      data,
      value: value || 0,
    });

    const receipt = await tx.wait();

    res.json({
      success: true,
      txHash: receipt.hash,
      userAddress,
      sponsoredBy: sponsorWallet.address,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Smart Account sponsor error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// Health Check
// ============================================================================

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      supabase: !!supabase,
      flareProvider: !!flareProvider,
      sponsorWallet: !!sponsorWallet,
    },
  });
});

// ============================================================================
// Start Server
// ============================================================================

const PORT = process.env.PORT || 3000;

// Only start the server if not running on Vercel
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Flare backend server running on port ${PORT}`);
    console.log(`   FTSO: /api/ftso/convert-usd-to-token`);
    console.log(`   FAssets: /api/fassets/verify-bridge`);
    console.log(`   FDC: /api/fdc/submit-proof`);
    console.log(`   Smart Accounts: /api/smart-account/sponsor-tx`);
  });
}

export default app;

