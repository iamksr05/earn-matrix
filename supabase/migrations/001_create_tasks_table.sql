-- Migration: Create tasks table with all base fields
-- Run this FIRST if tasks table doesn't exist

-- Create tasks table
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

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_poster_wallet ON tasks(poster_wallet);
CREATE INDEX IF NOT EXISTS idx_tasks_worker_wallet ON tasks(worker_wallet);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your auth needs)
-- For now, allowing all operations - you can restrict this later
CREATE POLICY "Allow all operations on tasks" ON tasks
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE tasks IS 'Tasks posted by users for completion by workers';
COMMENT ON COLUMN tasks.status IS 'Task status: open, accepted, submitted, completed, paid';
COMMENT ON COLUMN tasks.reward IS 'Reward amount in native token (FLR/ETH)';

