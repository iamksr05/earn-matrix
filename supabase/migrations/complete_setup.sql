-- Complete Database Setup Script
-- Run this in Supabase SQL Editor to set up everything at once
-- This creates the tasks table AND adds Flare fields

-- ============================================================================
-- Step 1: Create tasks table (if it doesn't exist)
-- ============================================================================

CREATE TABLE IF NOT EXISTS tasks (
  id BIGSERIAL PRIMARY KEY,
  
  -- Basic task information
  title TEXT NOT NULL,
  description TEXT,
  reward DECIMAL(18, 8) DEFAULT 0,
  location TEXT,
  category TEXT,
  deadline TIMESTAMPTZ,
  contact TEXT,
  
  -- Location coordinates
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Media
  image_url TEXT,
  
  -- User information
  poster_wallet TEXT NOT NULL DEFAULT '',
  poster_email TEXT,
  worker_wallet TEXT,
  
  -- Status and workflow
  status TEXT NOT NULL DEFAULT 'open',
  tx_hash TEXT DEFAULT '',
  
  -- Submission fields
  submission_url TEXT,
  submission_notes TEXT,
  submission_file_url TEXT,
  submitted_at TIMESTAMPTZ,
  
  -- Review fields
  review_notes TEXT,
  approved_at TIMESTAMPTZ,
  
  -- Payment
  payout_tx_hash TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- Step 2: Add Flare-specific fields
-- ============================================================================

-- USD pricing and token information
ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS reward_usd DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS reward_token DECIMAL(18, 8),
ADD COLUMN IF NOT EXISTS token_symbol VARCHAR(10) DEFAULT 'FLR',
ADD COLUMN IF NOT EXISTS price_mode VARCHAR(10) CHECK (price_mode IN ('token', 'usd'));

-- FAssets
ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS fasset_type VARCHAR(10),
ADD COLUMN IF NOT EXISTS fasset_bridge_tx TEXT,
ADD COLUMN IF NOT EXISTS fasset_token_address TEXT;

-- FDC
ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS fdc_condition_hash TEXT,
ADD COLUMN IF NOT EXISTS fdc_proof_data JSONB,
ADD COLUMN IF NOT EXISTS submission_verified BOOLEAN DEFAULT false;

-- Smart Account
ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS smart_account_address TEXT,
ADD COLUMN IF NOT EXISTS gasless_tx_hash TEXT;

-- ============================================================================
-- Step 3: Create indexes
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_poster_wallet ON tasks(poster_wallet);
CREATE INDEX IF NOT EXISTS idx_tasks_worker_wallet ON tasks(worker_wallet);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tasks_fdc_condition_hash ON tasks(fdc_condition_hash);
CREATE INDEX IF NOT EXISTS idx_tasks_token_symbol ON tasks(token_symbol);

-- ============================================================================
-- Step 4: Enable Row Level Security (optional, adjust as needed)
-- ============================================================================

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (you can restrict this later)
DROP POLICY IF EXISTS "Allow all operations on tasks" ON tasks;
CREATE POLICY "Allow all operations on tasks" ON tasks
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- Step 5: Add updated_at trigger
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Step 6: Add comments
-- ============================================================================

COMMENT ON TABLE tasks IS 'Tasks posted by users for completion by workers';
COMMENT ON COLUMN tasks.status IS 'Task status: open, accepted, submitted, completed, paid';
COMMENT ON COLUMN tasks.reward IS 'Reward amount in native token (FLR/ETH)';
COMMENT ON COLUMN tasks.reward_usd IS 'Reward amount in USD (when price_mode is "usd")';
COMMENT ON COLUMN tasks.token_symbol IS 'Token symbol (FLR, BTC, XRP, etc.)';

-- ============================================================================
-- Done! Your tasks table is now ready.
-- ============================================================================

