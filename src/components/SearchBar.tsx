import { useEffect, useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('faculty-search', { detail: { query } }));
  }, [query]);
  return (
    <div className="w-full flex justify-center mt-2">
      <input
        type="search"
        placeholder="Search faculty..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md px-3 py-2 border rounded-lg border-gray-300 dark:border-gray-600"
      />
    </div>
  );
}
