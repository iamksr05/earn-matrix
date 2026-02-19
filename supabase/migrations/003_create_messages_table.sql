-- Create messages table for chat functionality
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  task_id BIGINT NOT NULL,
  sender_address TEXT NOT NULL,
  receiver_address TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Foreign key to tasks table
  CONSTRAINT fk_task FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_messages_task_id ON messages(task_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read messages for tasks they're involved in
CREATE POLICY "Users can read their messages"
  ON messages FOR SELECT
  USING (
    sender_address = current_setting('request.jwt.claims', true)::json->>'wallet'
    OR receiver_address = current_setting('request.jwt.claims', true)::json->>'wallet'
  );

-- Policy: Users can insert messages
CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    sender_address = current_setting('request.jwt.claims', true)::json->>'wallet'
  );

