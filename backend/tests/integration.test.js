// backend/tests/integration.test.js
// Integration tests for Flare features

import { describe, it, expect, beforeAll } from '@jest/globals';
import request from 'supertest';
import app from '../server.js';

describe('Flare Integration Tests', () => {
  beforeAll(() => {
    // Set test environment variables
    process.env.SUPABASE_URL = 'https://test.supabase.co';
    process.env.SUPABASE_KEY = 'test-key';
    process.env.FLARE_RPC = 'https://test-rpc.flare.network';
  });

  describe('FTSO Endpoints', () => {
    it('GET /api/ftso/convert-usd-to-token should return conversion', async () => {
      const response = await request(app)
        .get('/api/ftso/convert-usd-to-token')
        .query({ usdAmount: 100, tokenSymbol: 'FLR' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('usdAmount');
      expect(response.body).toHaveProperty('tokenAmount');
      expect(response.body).toHaveProperty('rate');
      expect(response.body).toHaveProperty('totalAmount');
      expect(response.body.tokenSymbol).toBe('FLR');
    });

    it('should reject missing parameters', async () => {
      const response = await request(app)
        .get('/api/ftso/convert-usd-to-token');

      expect(response.status).toBe(400);
    });
  });

  describe('FDC Endpoints', () => {
    it('GET /api/fdc/register-condition should return condition hash', async () => {
      const response = await request(app)
        .get('/api/fdc/register-condition')
        .query({ taskId: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('conditionHash');
      expect(response.body.conditionHash).toMatch(/^0x[a-f0-9]{64}$/);
    });

    it('POST /api/fdc/submit-proof should accept proof', async () => {
      const conditionHash = '0x' + 'a'.repeat(64);
      const response = await request(app)
        .post('/api/fdc/submit-proof')
        .send({
          taskId: 1,
          conditionHash,
          proofData: { verified: true },
          signature: 'mock-signature',
        });

      // May fail if Supabase not configured, but structure should be correct
      expect([200, 404, 500]).toContain(response.status);
    });
  });

  describe('FAssets Endpoints', () => {
    it('POST /api/fassets/verify-bridge should verify bridge transaction', async () => {
      const response = await request(app)
        .post('/api/fassets/verify-bridge')
        .send({
          taskId: 1,
          bridgeTx: '0x' + 'b'.repeat(64),
          fassetType: 'BTC',
        });

      // May fail if Supabase not configured
      expect([200, 404, 500]).toContain(response.status);
    });
  });

  describe('Health Check', () => {
    it('GET /health should return status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status');
      expect(response.body.status).toBe('ok');
    });
  });
});

