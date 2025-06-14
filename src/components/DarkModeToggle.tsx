import useDarkMode from '../hooks/useDarkMode';

interface Props {
  className?: string;
}

export default function DarkModeToggle({ className = '' }: Props) {
  const { isDark, toggleDark } = useDarkMode();

  return (
    <button
      onClick={toggleDark}
 
      className={`p-2 rounded-md ${className} ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
   
      aria-label="Toggle dark mode"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
 
        fill="currentColor"
        className="w-6 h-6 text-gray-700 dark:text-[#00FFD8]"
 
      >
        <path
          d="M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z"
        />
      </svg>
    </button>
  );
}
