-- Migration: Add Flare-specific fields to tasks table
-- Run this AFTER creating the tasks table (001_create_tasks_table.sql)
-- This will work even if tasks table already exists

-- Add columns for USD pricing and token information
ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS reward_usd DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS reward_token DECIMAL(18, 8),
ADD COLUMN IF NOT EXISTS token_symbol VARCHAR(10) DEFAULT 'FLR',
ADD COLUMN IF NOT EXISTS price_mode VARCHAR(10) CHECK (price_mode IN ('token', 'usd'));

-- Add columns for FAssets
ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS fasset_type VARCHAR(10),
ADD COLUMN IF NOT EXISTS fasset_bridge_tx TEXT,
ADD COLUMN IF NOT EXISTS fasset_token_address TEXT;

-- Add columns for FDC
ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS fdc_condition_hash TEXT,
ADD COLUMN IF NOT EXISTS fdc_proof_data JSONB,
ADD COLUMN IF NOT EXISTS submission_verified BOOLEAN DEFAULT false;

-- Add columns for Smart Account
ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS smart_account_address TEXT,
ADD COLUMN IF NOT EXISTS gasless_tx_hash TEXT;

-- Add index for FDC condition hash lookups
CREATE INDEX IF NOT EXISTS idx_tasks_fdc_condition_hash ON tasks(fdc_condition_hash);

-- Add index for token symbol queries
CREATE INDEX IF NOT EXISTS idx_tasks_token_symbol ON tasks(token_symbol);

-- Comments for documentation
COMMENT ON COLUMN tasks.reward_usd IS 'Reward amount in USD (when price_mode is "usd")';
COMMENT ON COLUMN tasks.reward_token IS 'Reward amount in token units';
COMMENT ON COLUMN tasks.token_symbol IS 'Token symbol (FLR, BTC, XRP, etc.)';
COMMENT ON COLUMN tasks.price_mode IS 'Pricing mode: "token" or "usd"';
COMMENT ON COLUMN tasks.fasset_bridge_tx IS 'FAsset bridge transaction hash from source chain';
COMMENT ON COLUMN tasks.fdc_condition_hash IS 'Hash of condition for FDC auto-release';
COMMENT ON COLUMN tasks.fdc_proof_data IS 'FDC proof data (JSON)';
COMMENT ON COLUMN tasks.smart_account_address IS 'Smart Account address for gasless transactions';

