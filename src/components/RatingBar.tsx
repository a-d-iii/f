import type { FC } from 'react';

interface Props {
  rating: number | null | undefined;
  label: string;
}

const getColor = (rating: number) => {
  if (rating === 5) return { bg: 'bg-violet-600', text: 'text-violet-600' };
  if (rating > 4) return { bg: 'bg-green-600', text: 'text-green-600' };
  if (rating > 3.5) return { bg: 'bg-green-500', text: 'text-green-500' };
  if (rating >= 3) return { bg: 'bg-yellow-400', text: 'text-yellow-400' };
  if (rating >= 2) return { bg: 'bg-red-500', text: 'text-red-500' };
  return { bg: 'bg-red-700', text: 'text-red-700' };
};

const RatingBar: FC<Props> = ({ rating, label }) => {
  const value = typeof rating === 'number' ? rating : 0;
  const { bg, text } = getColor(value);
  const width = `${Math.min(Math.max(value, 0), 5) / 5 * 100}%`;
  return (
    <div className="w-full my-1">
      <div className="flex justify-between items-baseline px-1">
        <span className={`text-xs font-semibold ${text}`}>{label}</span>
        <span className={`text-xs font-semibold ${text}`}>{value.toFixed(1)}</span>
      </div>
      <div className="w-full h-2 rounded bg-gray-300 dark:bg-gray-700 overflow-hidden">
        <div className={`${bg} h-full`} style={{ width }}></div>
      </div>
    </div>
  );
};

export default RatingBar;
