import MiniSearch from 'minisearch';
import type { FC, FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';

interface Props { data: { id: string; name: string }[]; onFilter: (ids: string[]) => void; }

const SearchBar: FC<Props> = ({ data, onFilter }) => {
  const [query, setQuery] = useState('');
  const index = useMemo(
    () => new MiniSearch({ fields: ['name'], storeFields: ['id'] }),
    []
  );

  useEffect(() => {
    index.addAll(data);
  }, [data]);

  useEffect(() => {
    if (!query) return onFilter(data.map((d) => d.id));
    const results = index.search(query);
    onFilter(results.map((r) => r.id as string));
  }, [query]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query) return onFilter(data.map((d) => d.id));
    const results = index.search(query);
    onFilter(results.map((r) => r.id as string));
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        aria-label="Search faculty"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        className="flex-1 p-2 border rounded"
        placeholder="Search by name..."
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded shadow"
      >
        Search
      </button>
    </form>
  );
};
export default SearchBar;
