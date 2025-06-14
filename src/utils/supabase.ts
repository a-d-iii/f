import localData from '../data/faculty.json';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

export async function fetchLists() {
  try {
    let data: any[] | null = null;

    if (import.meta.env.SSR) {
      const res = await supabaseAdmin.from('lists').select('*');
      if (res.error) throw res.error;
      data = res.data;
    } else {
      const resp = await fetch('/api/lists');
      if (!resp.ok) throw new Error('Failed to fetch lists');
      data = await resp.json();
    }

    const list = data ?? [];
    const withName = list.filter((f: any) => f.name && String(f.name).trim());
    const withoutName = list.filter((f: any) => !f.name || !String(f.name).trim());
    return [...withName, ...withoutName];
  } catch (err) {
    console.error('Error fetching lists:', err);
    const list = (localData as any[]) ?? [];
    const withName = list.filter((f: any) => f.name && String(f.name).trim());
    const withoutName = list.filter((f: any) => !f.name || !String(f.name).trim());
    return [...withName, ...withoutName];
  }
}
