import type { FC } from 'react';

interface Props {
  rating: number | null | undefined;
  showValue?: boolean; // retained for compatibility but ignored
  disabled?: boolean;
}

const getColor = (rating: number) => {
  if (rating === 5) return 'bg-violet-600 text-white ring-2 ring-violet-300 animate-pulse';
  if (rating > 4) return 'bg-green-600 text-white';
  if (rating > 3.5) return 'bg-green-500 text-white';
  if (rating >= 3) return 'bg-yellow-400 text-gray-900';
  if (rating >= 2) return 'bg-red-500 text-white';
  return 'bg-red-700 text-white';
};

const RatingWidget: FC<Props> = ({ rating }) => {
  const value = typeof rating === 'number' ? rating : 0;
  const classes = `w-10 h-10 rounded-lg font-bold text-sm flex items-center justify-center ${getColor(value)}`;
  return (
    <div aria-label={`Rating ${value}`} className={classes}>
      {value.toFixed(1)}
    </div>
  );
};

export default RatingWidget;
