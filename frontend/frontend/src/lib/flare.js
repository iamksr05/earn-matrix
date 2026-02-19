// src/lib/flare.js
// Flare integration utilities: FTSO, FAssets, FDC, Smart Accounts

import config from '../config';

const API_URL = config.apiUrl;

// ============================================================================
// FTSO Price Oracle
// ============================================================================

/**
 * Convert USD amount to token amount using FTSO price oracle
 * @param {number} usdAmount - USD amount
 * @param {string} tokenSymbol - Token symbol (FLR, BTC, XRP, etc.)
 * @returns {Promise<{tokenAmount: string, rate: string, totalAmount: string}>}
 */
export async function convertUSDToToken(usdAmount, tokenSymbol) {
  try {
    const response = await fetch(
      `${API_URL}/api/ftso/convert-usd-to-token?usdAmount=${usdAmount}&tokenSymbol=${tokenSymbol}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'FTSO conversion failed');
    }
    const data = await response.json();
    return {
      tokenAmount: data.tokenAmount,
      rate: data.rate,
      buffer: data.buffer,
      totalAmount: data.totalAmount,
      tokenSymbol: data.tokenSymbol,
    };
  } catch (error) {
    console.error('FTSO conversion error:', error);
    throw error;
  }
}

// ============================================================================
// FAssets Bridge Verification
// ============================================================================

/**
 * Verify FAsset bridge transaction
 * @param {number} taskId - Task ID
 * @param {string} bridgeTx - Bridge transaction hash
 * @param {string} fassetType - FAsset type (BTC, XRP, etc.)
 * @returns {Promise<{verified: boolean, tokenAddress: string}>}
 */
export async function verifyFAssetBridge(taskId, bridgeTx, fassetType) {
  try {
    const response = await fetch(`${API_URL}/api/fassets/verify-bridge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, bridgeTx, fassetType }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'FAsset verification failed');
    }
    return await response.json();
  } catch (error) {
    console.error('FAsset verification error:', error);
    throw error;
  }
}

// ============================================================================
// FDC (Flare Data Connector)
// ============================================================================

/**
 * Register a condition hash for FDC auto-release
 * @param {number} taskId - Task ID
 * @returns {Promise<{conditionHash: string}>}
 */
export async function registerFDCCondition(taskId) {
  try {
    const response = await fetch(
      `${API_URL}/api/fdc/register-condition?taskId=${taskId}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'FDC condition registration failed');
    }
    return await response.json();
  } catch (error) {
    console.error('FDC condition registration error:', error);
    throw error;
  }
}

/**
 * Submit FDC proof for auto-release
 * @param {number} taskId - Task ID
 * @param {string} conditionHash - Condition hash
 * @param {object} proofData - Proof data
 * @param {string} signature - Signature
 * @returns {Promise<{success: boolean, txHash: string}>}
 */
export async function submitFDCProof(taskId, conditionHash, proofData, signature) {
  try {
    const response = await fetch(`${API_URL}/api/fdc/submit-proof`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, conditionHash, proofData, signature }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'FDC proof submission failed');
    }
    return await response.json();
  } catch (error) {
    console.error('FDC proof submission error:', error);
    throw error;
  }
}

// ============================================================================
// Smart Account (Gasless Transactions)
// ============================================================================

/**
 * Sponsor a gasless transaction via Smart Account
 * @param {string} to - Contract address
 * @param {string} data - Transaction data
 * @param {string} value - Value in wei (optional)
 * @param {string} userAddress - User's address
 * @returns {Promise<{txHash: string}>}
 */
export async function sponsorGaslessTx(to, data, value, userAddress) {
  try {
    const response = await fetch(`${API_URL}/api/smart-account/sponsor-tx`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, data, value: value || '0', userAddress }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Gasless transaction failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Gasless transaction error:', error);
    throw error;
  }
}

/**
 * Check if user has a Smart Account
 * @param {string} userAddress - User's address (reserved for future use)
 * @returns {Promise<boolean>}
 */
export async function hasSmartAccount(userAddress) {
  // In production, query Smart Account Factory contract using userAddress
  // For now, return false (fallback to normal transactions)
  void userAddress; // Suppress unused parameter warning
  return false;
}

// ============================================================================
// Token Selection Helper
// ============================================================================

export const SUPPORTED_TOKENS = [
  { symbol: 'FLR', name: 'Flare (Native)', isNative: true, isFAsset: false },
  { symbol: 'BTC', name: 'Bitcoin (FAsset)', isNative: false, isFAsset: true },
  { symbol: 'XRP', name: 'Ripple (FAsset)', isNative: false, isFAsset: true },
  { symbol: 'ETH', name: 'Ethereum', isNative: false, isFAsset: false },
];

/**
 * Get token info by symbol
 * @param {string} symbol - Token symbol
 * @returns {object|null}
 */
export function getTokenInfo(symbol) {
  return SUPPORTED_TOKENS.find(t => t.symbol === symbol.toUpperCase()) || null;
}

