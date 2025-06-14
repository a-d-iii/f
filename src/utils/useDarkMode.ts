import { useEffect, useState, useCallback } from 'react';

export default function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const apply = useCallback((dark: boolean) => {
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    apply(isDark);
  }, [isDark, apply]);

  const toggleDark = useCallback(() => setIsDark((d) => !d), []);

  return [isDark, toggleDark] as const;
}
