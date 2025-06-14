import SearchBar from './SearchBar';
import useDarkMode from '../utils/useDarkMode';

export default function Header() {
  const [isDark, toggleDark] = useDarkMode();

  return (
    <header className="relative p-4 mt-4 mb-2 flex flex-col items-center gap-4">
      <div className="w-full flex justify-center items-center relative">
        <h1 className={`text-4xl font-bold ${isDark ? 'text-[#00FFD8]' : ''}`}>Faculty Ranker</h1>
        <button
          onClick={toggleDark}
          className={`absolute right-4 top-1 p-2 rounded-full transition-colors ${
            isDark ? 'bg-gray-700' : 'bg-gray-200'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-6 h-6 ${isDark ? 'text-[#00FFD8]' : 'text-gray-700'}`}
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </button>
      </div>
      <SearchBar />
    </header>
  );
}
