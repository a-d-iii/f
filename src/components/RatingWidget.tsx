import type { FC } from 'react';

interface Props {
  rating: number | null | undefined;
  showValue?: boolean; // retained for compatibility but ignored
  disabled?: boolean;
}

const getLightTextColor = (rating: number) => {
  if (rating === 5) return 'text-violet-600';
  if (rating > 4) return 'text-green-600';
  if (rating > 3.5) return 'text-green-500';
  if (rating >= 3) return 'text-yellow-600';
  if (rating >= 2) return 'text-red-500';
  return 'text-red-700';
};

const getDarkTextColor = (rating: number) => {
  if (rating > 4) return 'dark:text-[#00FFD8]';
  if (rating >= 3) return 'dark:text-yellow-400';
  return 'dark:text-[#FF00C8]';
};

const RatingWidget: FC<Props> = ({ rating }) => {
  const value = typeof rating === 'number' ? rating : 0;
  const classes = `font-bold text-lg ${getLightTextColor(value)} ${getDarkTextColor(value)}`;
  return (
    <div aria-label={`Rating ${value}`} className={classes}>
      {value.toFixed(1)}
    </div>
  );
};

export default RatingWidget;
