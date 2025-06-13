import { useState } from 'react';

export default function HeartButton() {
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);

  const toggle = () => {
    setLiked(!liked);
    setAnimate(true);
  };

  return (
    <svg
      onClick={toggle}
      onAnimationEnd={() => setAnimate(false)}
 
      className={`w-6 h-6 cursor-pointer absolute bottom-2 right-2 transition-colors ${
 
        liked ? 'text-red-500' : 'text-gray-400'
      } ${animate ? 'animate-pop' : ''}`}
      viewBox="0 0 24 24"
      fill={liked ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
