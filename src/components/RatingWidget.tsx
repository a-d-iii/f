import { motion } from '@motionone/react';
import type { FC } from 'react';

interface Props {
  rating: number;
  showValue?: boolean;
  disabled?: boolean;
}

const RatingWidget: FC<Props> = ({ rating, showValue = false }) => {
  return (
    <div
      aria-label={`Average rating ${rating}`}
      className="flex items-center gap-1"
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}>
          {i <= Math.round(rating) ? '★' : '☆'}
        </motion.span>
      ))}
      {showValue && <span className="text-sm">{rating.toFixed(1)}</span>}
    </div>
  );
};
export default RatingWidget;
