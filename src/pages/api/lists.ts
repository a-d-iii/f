import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';

export const GET: APIRoute = async () => {
  const { data, error } = await supabaseAdmin.from('lists').select('*');
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify(data ?? []), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
