import { useState, useEffect } from 'react';

export interface Faculty {
  id?: string;
  name?: string;
  [key: string]: any;
}

export default function useWishlist() {
  const [wishlist, setWishlist] = useState<Faculty[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch {}
    }
    const handler = (e: Event) => {
      const data = (e as CustomEvent<Faculty[]>).detail;
      setWishlist(data);
    };
    window.addEventListener('wishlist-change', handler);
    return () => window.removeEventListener('wishlist-change', handler);
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  function toggle(faculty: Faculty) {
    setWishlist((curr) => {
      const exists = curr.some((f) => f.id === faculty.id);
      const updated = exists
        ? curr.filter((f) => f.id !== faculty.id)
        : [...curr, faculty];
      window.dispatchEvent(
        new CustomEvent('wishlist-change', { detail: updated })
      );
      return updated;
    });
  }

  return { wishlist, toggle };
}
