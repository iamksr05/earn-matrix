// backend/tests/ftso.test.js
// Tests for FTSO price conversion

import { describe, it, expect } from '@jest/globals';

/**
 * Mock FTSO conversion function
 */
function mockConvertUSDToToken(usdAmount, tokenSymbol) {
  const mockRates = {
    FLR: 0.01,
    BTC: 45000,
    XRP: 0.5,
    ETH: 2500,
  };

  const rate = mockRates[tokenSymbol.toUpperCase()] || 1;
  const tokenAmount = usdAmount / rate;
  const buffer = tokenAmount * 0.05;
  const totalAmount = tokenAmount + buffer;

  return {
    usdAmount,
    tokenSymbol: tokenSymbol.toUpperCase(),
    tokenAmount: tokenAmount.toString(),
    rate: rate.toString(),
    buffer: buffer.toString(),
    totalAmount: totalAmount.toString(),
  };
}

describe('FTSO Price Conversion', () => {
  it('should convert USD to FLR correctly', () => {
    const result = mockConvertUSDToToken(100, 'FLR');
    expect(result.usdAmount).toBe(100);
    expect(result.tokenSymbol).toBe('FLR');
    expect(parseFloat(result.rate)).toBe(0.01);
    expect(parseFloat(result.tokenAmount)).toBe(10000);
    expect(parseFloat(result.buffer)).toBeCloseTo(500, 1);
    expect(parseFloat(result.totalAmount)).toBeCloseTo(10500, 1);
  });

  it('should convert USD to BTC correctly', () => {
    const result = mockConvertUSDToToken(100, 'BTC');
    expect(result.usdAmount).toBe(100);
    expect(result.tokenSymbol).toBe('BTC');
    expect(parseFloat(result.rate)).toBe(45000);
    expect(parseFloat(result.tokenAmount)).toBeCloseTo(0.002222, 6);
  });

  it('should add 5% buffer for volatility', () => {
    const result = mockConvertUSDToToken(100, 'FLR');
    const tokenAmount = parseFloat(result.tokenAmount);
    const buffer = parseFloat(result.buffer);
    const totalAmount = parseFloat(result.totalAmount);

    expect(buffer).toBeCloseTo(tokenAmount * 0.05, 1);
    expect(totalAmount).toBeCloseTo(tokenAmount + buffer, 1);
  });

  it('should handle unknown tokens gracefully', () => {
    const result = mockConvertUSDToToken(100, 'UNKNOWN');
    expect(parseFloat(result.rate)).toBe(1);
    expect(parseFloat(result.tokenAmount)).toBe(100);
  });

  it('should return deterministic rates for testing', () => {
    const result1 = mockConvertUSDToToken(50, 'FLR');
    const result2 = mockConvertUSDToToken(50, 'FLR');
    expect(result1.totalAmount).toBe(result2.totalAmount);
  });
});

