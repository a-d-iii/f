import { useEffect, useState } from 'react';
import FacultyCardReact from './FacultyCardReact';

interface Faculty {
  [key: string]: any;
}

export default function FacultyList({ faculty }: { faculty: Faculty[] }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ query: string }>).detail;
      setQuery(detail.query || '');
    };
    window.addEventListener('faculty-search', handler);
    return () => window.removeEventListener('faculty-search', handler);
  }, []);

  const filtered = faculty.filter((f) => {
    if (!query) return true;
    const q = query.toLowerCase();
    const name = String(f.name || '').toLowerCase();
    const dept = String(
      f.specialization ||
        f.specialisation ||
        f.specializations ||
        f.dept ||
        f.department ||
        ''
    ).toLowerCase();
    return name.includes(q) || dept.includes(q);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {filtered.map((f) => (
        <FacultyCardReact key={f.id} faculty={f} />
      ))}
    </div>
  );
}
