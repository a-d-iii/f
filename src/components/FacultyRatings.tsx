import { useState } from 'react';
import RatingWidget from './RatingWidget';

type Props = {
  teaching: number | null | undefined;
  attendance: number | null | undefined;
  correction: number | null | undefined;
  count?: number | null | undefined;
};

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927a1 1 0 011.902 0l1.286 3.959a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.374 2.454a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.538 1.118L10 13.347l-3.374 2.454c-.782.57-1.837-.197-1.538-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.636 9.386c-.782-.57-.38-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.96z" />
    </svg>
  );
}

function StarRow({ label, value, count }: { label: string; value: number; count?: number | null | undefined }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-sm font-semibold flex-1">{label}</span>
      <span className="flex">
        {[1,2,3,4,5].map(i => (
          <Star key={i} filled={i <= full || (i === full + 1 && half)} />
        ))}
      </span>

      <span className={`text-xs ml-1 w-8 text-right font-semibold ${getTextColor(value)}`}>{value.toFixed(1)}</span>

      {typeof count === 'number' && (
        <span className="text-xs text-gray-500 flex items-center gap-1 ml-1">
          <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M13 7a3 3 0 11-6 0 3 3 0 016 0zM5 13a4 4 0 018 0v1H5v-1zM15 12h2a2 2 0 012 2v2h-4v-4z" />
          </svg>
          {count}
        </span>
      )}
    </div>
  );
}

function getTextColor(rating: number) {
  if (rating === 5) return 'text-violet-600';
  if (rating > 4) return 'text-green-600';
  if (rating > 3.5) return 'text-green-500';
  if (rating >= 3) return 'text-yellow-400';
  if (rating >= 2) return 'text-red-500';
  return 'text-red-700';
}

export default function FacultyRatings({ teaching, attendance, correction, count }: Props) {
  const [detailed, setDetailed] = useState(false);

  return (
    <div>
      <div className="flex justify-end mb-1">
        <button
          type="button"
          onClick={() => setDetailed(!detailed)}
          className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {detailed ? 'Compact ratings' : 'Detailed ratings'}
        </button>
      </div>
      {detailed ? (
        <div className="flex flex-col gap-1 mb-2">
          <StarRow label="Teaching" value={typeof teaching === 'number' ? teaching : 0} count={count} />
          <StarRow label="Attendance" value={typeof attendance === 'number' ? attendance : 0} count={count} />
          <StarRow label="Correction" value={typeof correction === 'number' ? correction : 0} count={count} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 mb-2 w-full text-center">
          <div className="flex flex-col items-center gap-1">
            <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 flex flex-col items-center gap-1 shadow w-full">
              <RatingWidget rating={teaching} />
              <span className="text-xs font-medium">Teaching</span>
            </div>
            {typeof count === 'number' && (
              <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M13 7a3 3 0 11-6 0 3 3 0 016 0zM5 13a4 4 0 018 0v1H5v-1zM15 12h2a2 2 0 012 2v2h-4v-4z" />
                </svg>
                {count}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 flex flex-col items-center gap-1 shadow w-full">
              <RatingWidget rating={attendance} />
              <span className="text-xs font-medium">Attendance</span>
            </div>
            {typeof count === 'number' && (
              <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M13 7a3 3 0 11-6 0 3 3 0 016 0zM5 13a4 4 0 018 0v1H5v-1zM15 12h2a2 2 0 012 2v2h-4v-4z" />
                </svg>
                {count}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 flex flex-col items-center gap-1 shadow w-full">
              <RatingWidget rating={correction} />
              <span className="text-xs font-medium">Correction</span>
            </div>
            {typeof count === 'number' && (
              <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M13 7a3 3 0 11-6 0 3 3 0 016 0zM5 13a4 4 0 018 0v1H5v-1zM15 12h2a2 2 0 012 2v2h-4v-4z" />
                </svg>
                {count}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
