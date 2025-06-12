import MiniSearch from 'minisearch';
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';

interface Props { data: { id: number; name: string }[]; onFilter: (ids: number[]) => void; }

const SearchBar: FC<Props> = ({ data, onFilter }) => {
  const [query, setQuery] = useState('');
  const index = useMemo(() => new MiniSearch({ fields: ['name'], storeFields: ['id'] }), []);

  useEffect(() => {
    index.addAll(data);
  }, [data]);

  useEffect(() => {
    if (!query) return onFilter(data.map((d) => d.id));
    const results = index.search(query);
    onFilter(results.map((r) => r.id as number));
  }, [query]);

  return (
    <input
      aria-label="Search faculty"
      value={query}
      onChange={(e) => setQuery(e.currentTarget.value)}
      className="w-full p-2 border rounded"
      placeholder="Search by name..."
    />
  );
};
export default SearchBar;
