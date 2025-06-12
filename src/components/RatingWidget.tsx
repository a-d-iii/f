import { motion } from '@motionone/react';
import type { FC } from 'react';

interface Props { rating: number; disabled?: boolean }

const RatingWidget: FC<Props> = ({ rating }) => {
  return (
    <div aria-label={`Average rating ${rating}`} className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}>
          {i <= Math.round(rating) ? '★' : '☆'}
        </motion.span>
      ))}
    </div>
  );
};
export default RatingWidget;
