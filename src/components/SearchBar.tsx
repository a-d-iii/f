import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

import FacultyRatings from './FacultyRatings.tsx';
import RateFaculty from './RateFaculty.tsx';
import HeartButton from './HeartButton.tsx';


interface ListItem {
  name: string;
  photo_url: string | null;
  specialization: string | null;
  teaching_rating: number | null;
  attendance_rating: number | null;
  correction_rating: number | null;
  total_ratings: number | null;
}

const supabaseUrl =
  (import.meta as any).env.PUBLIC_SUPABASE_URL ||
  'https://dwyojdeyfaozeeplpbyr.supabase.co';
const supabaseAnonKey =
  (import.meta as any).env.PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3eW9qZGV5ZmFvemVlcGxwYnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTY5MTMsImV4cCI6MjA2NTM3MjkxM30.A3EWWal-iREIyXX6j2F5Dzdi9KBTJQXAF1GHVcpDHY8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const ctrl = { cancelled: false };
    setLoading(true);
    setError(null);
    const timer = setTimeout(async () => {
      const { data, error } = await supabase
        .from('lists')
        .select('*')
        .ilike('name', `%${query}%`);
      if (ctrl.cancelled) return;
      if (error) {
        setError(error.message);
        setResults([]);
      } else {
        setResults((data as ListItem[]) || []);
      }
      setLoading(false);
    }, 300);

    return () => {
      ctrl.cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <div className="mb-6">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-lg mb-4"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && query.trim() && results.length === 0 && (
        <p className="text-gray-500">No results found.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((item) => (

          <article key={item.name} className="card pb-32">
            <div className="flex items-start gap-4 mb-2 h-40">
              <div className="photo-wrapper">
                <img
                  src={item.photo_url || 'https://placehold.co/300x400?text=No+Photo'}
                  alt={`Photo of ${item.name}`}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = 'https://placehold.co/300x400?text=No+Photo';
                    target.onerror = null;
                  }}
                  className="faculty-photo"
                />
              </div>
              <div className="flex flex-col flex-1 h-40 overflow-hidden">
                <h3 className="text-lg font-bold mb-1 clamp-two-lines faculty-name font-poppins">{item.name}</h3>
                {item.specialization && (
                  <p className="text-sm italic text-gray-400 dark:text-gray-400 leading-snug overflow-hidden flex-grow clamp-four-lines font-segoe">
                    {item.specialization}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <FacultyRatings
                teaching={item.teaching_rating ?? 0}
                attendance={item.attendance_rating ?? 0}
                correction={item.correction_rating ?? 0}
                tCount={item.total_ratings ?? null}
                aCount={item.total_ratings ?? null}
                cCount={item.total_ratings ?? null}
              />
            </div>
            <RateFaculty />
            <HeartButton />
          </article>

        ))}
      </div>
    </div>
  );
}
