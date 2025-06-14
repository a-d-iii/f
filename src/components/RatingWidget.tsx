import type { FC } from 'react';

interface Props {
  rating: number | null | undefined;
  count?: number | null | undefined;
  showValue?: boolean; // retained for compatibility but ignored
  disabled?: boolean;
}

const getLightColor = (rating: number, count?: number | null) => {
  if (count === 0) return 'bg-gray-400 text-white';
  if (rating === 5) return 'bg-violet-600 text-white ring-2 ring-violet-300 animate-pulse';
  if (rating > 4) return 'bg-green-600 text-white';
  if (rating > 3.5) return 'bg-green-500 text-white';
  if (rating >= 3) return 'bg-yellow-400 text-gray-900';
  if (rating >= 2) return 'bg-red-500 text-white';
  return 'bg-red-700 text-white';
};

const getDarkTextColor = (rating: number, count?: number | null) => {
  if (count === 0) return 'dark:text-gray-400';
  if (rating > 4) return 'dark:text-[#00FFD8]';
  if (rating >= 3) return 'dark:text-yellow-400';
  return 'dark:text-[#FF00C8]';
};

const RatingWidget: FC<Props> = ({ rating, count }) => {
  const value = typeof rating === 'number' ? rating : 0;
  const classes = `px-2 py-1 dark:py-0.5 rounded-lg font-bold text-lg ${getLightColor(value, count)} dark:bg-transparent dark:ring-0 ${getDarkTextColor(value, count)}`;
  return (
    <div aria-label={`Rating ${value}`} className={classes}>
      {value.toFixed(1)}
    </div>
  );
};

export default RatingWidget;
