import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dwyojdeyfaozeeplpbyr.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3eW9qZGV5ZmFvemVlcGxwYnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTY5MTMsImV4cCI6MjA2NTM3MjkxM30.A3EWWal-iREIyXX6j2F5Dzdi9KBTJQXAF1GHVcpDHY8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchLists() {
  try {
    const { data, error } = await supabase.from('lists').select('*');
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error('Error fetching lists:', err);
    return [];
  }
}
