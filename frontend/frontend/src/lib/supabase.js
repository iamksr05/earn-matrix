import { createClient } from '@supabase/supabase-js';

// Validate environment variables with safer error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate URL format
let isValidUrl = false;
if (supabaseUrl) {
  try {
    new URL(supabaseUrl);
    isValidUrl = true;
  } catch (e) {
    console.error('Invalid VITE_SUPABASE_URL:', supabaseUrl);
  }
}

if (!supabaseUrl || !isValidUrl) {
  console.error('Missing or invalid VITE_SUPABASE_URL environment variable');
  console.error('Current value:', supabaseUrl);
}

if (!supabaseAnonKey) {
  console.error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

// Create Supabase client if we have valid credentials
let supabaseClient = null;
if (supabaseUrl && isValidUrl && supabaseAnonKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client initialized successfully');
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
  }
} else {
  console.error('❌ Supabase client not initialized - missing or invalid credentials');
  console.error('URL:', supabaseUrl, 'Valid:', isValidUrl, 'Key:', supabaseAnonKey ? 'Present' : 'Missing');
}

export const supabase = supabaseClient;
