import useWishlist from '../hooks/useWishlist';

export default function WishlistIcon() {
  const { wishlist } = useWishlist();
  return (
    <a href="/wishlist" aria-label="Wishlist" className="relative">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 text-gray-700 dark:text-pink-400"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      {wishlist.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
          {wishlist.length}
        </span>
      )}
    </a>
  );
}
