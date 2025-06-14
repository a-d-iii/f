import { useEffect, useState } from 'react';
import RatingWidget from './RatingWidget';

type Props = {
  teaching: number | null | undefined;
  attendance: number | null | undefined;
  correction: number | null | undefined;
  tCount?: number | null | undefined;
  aCount?: number | null | undefined;
  cCount?: number | null | undefined;
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
 
      <span className="text-base text-gray-500 dark:text-gray-300 flex-1 font-segoe">{label}</span>
 
      <span className="flex">
        {[1,2,3,4,5].map(i => (
          <Star key={i} filled={i <= full || (i === full + 1 && half)} />
        ))}
      </span>

      <span className={`text-xs ml-1 w-8 text-right font-semibold ${getTextColor(value)}`}>{value.toFixed(1)}</span>

      {typeof count === 'number' && (
        <span className="text-sm text-gray-500 flex items-center gap-1 ml-1">
          <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M2 11a1 1 0 112 0v6a1 1 0 11-2 0v-6zm5-5a1 1 0 112 0v11a1 1 0 11-2 0V6zm5 8a1 1 0 112 0v3a1 1 0 11-2 0v-3zm5-10a1 1 0 112 0v13a1 1 0 11-2 0V4z" />
          </svg>
          {count}
        </span>
      )}
    </div>
  );
}

function getTextColor(rating: number) {
  if (rating === 5) return 'text-violet-600 dark:text-[#00FFD8]';
  if (rating > 4) return 'text-green-600 dark:text-[#00FFD8]';
  if (rating > 3.5) return 'text-green-500 dark:text-[#00FFD8]';
  if (rating >= 3) return 'text-yellow-400 dark:text-yellow-400';
  if (rating >= 2) return 'text-red-500 dark:text-[#FF00C8]';
  return 'text-red-700 dark:text-[#FF00C8]';
}


export default function FacultyRatings({ teaching, attendance, correction, tCount, aCount, cCount }: Props) {
  const [detailed, setDetailed] = useState<boolean>(
    typeof window !== 'undefined' && (window as any).showDetailedRatings === true
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ show: boolean }>;
      setDetailed(ev.detail.show);
    };
    window.addEventListener('detailed-ratings-change', handler);
    return () => window.removeEventListener('detailed-ratings-change', handler);
  }, []);
 
  return (
    <div>
      {detailed ? (
        <div className="flex flex-col gap-1 mb-2">
          <StarRow label="Teaching" value={typeof teaching === 'number' ? teaching : 0} count={tCount} />
          <StarRow label="Attendance" value={typeof attendance === 'number' ? attendance : 0} count={aCount} />
          <StarRow label="Correction" value={typeof correction === 'number' ? correction : 0} count={cCount} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 mb-2 w-full text-center">

          <div className="flex flex-col items-center gap-1">
            <div className="px-2 py-1 md:py-0.5 dark:py-0.5 rounded-lg bg-gray-200 flex flex-col items-center gap-1 shadow w-full dark:justify-center dark:bg-transparent dark:border-2 dark:text-[#FF00C8] dark:border-[#FF00C8] dark:hover:bg-[#FF00C8]20 dark:hover:drop-shadow-[0_0_10px_#FF00C8]">
              <RatingWidget rating={teaching} />

              <span className="text-sm text-gray-500 dark:text-inherit font-segoe">Teaching</span>
              
            </div>
            {typeof tCount === 'number' && (
              <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M2 11a1 1 0 112 0v6a1 1 0 11-2 0v-6zm5-5a1 1 0 112 0v11a1 1 0 11-2 0V6zm5 8a1 1 0 112 0v3a1 1 0 11-2 0v-3zm5-10a1 1 0 112 0v13a1 1 0 11-2 0V4z" />
                </svg>
                {tCount}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="px-2 py-1 md:py-0.5 dark:py-0.5 rounded-lg bg-gray-200 flex flex-col items-center gap-1 shadow w-full dark:justify-center dark:bg-transparent dark:border-2 dark:text-[#00FFD8] dark:border-[#00FFD8] dark:hover:bg-[#00FFD8]20 dark:hover:drop-shadow-[0_0_10px_#00FFD8]">
              <RatingWidget rating={attendance} />

              <span className="text-sm text-gray-500 dark:text-inherit font-segoe">Attendance</span>
              
            </div>
            {typeof aCount === 'number' && (
              <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M2 11a1 1 0 112 0v6a1 1 0 11-2 0v-6zm5-5a1 1 0 112 0v11a1 1 0 11-2 0V6zm5 8a1 1 0 112 0v3a1 1 0 11-2 0v-3zm5-10a1 1 0 112 0v13a1 1 0 11-2 0V4z" />
                </svg>
                {aCount}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="px-2 py-1 md:py-0.5 dark:py-0.5 rounded-lg bg-gray-200 flex flex-col items-center gap-1 shadow w-full dark:justify-center dark:bg-transparent dark:border-2 dark:text-[#FFD500] dark:border-[#FFD500] dark:hover:bg-[#FFD500]20 dark:hover:drop-shadow-[0_0_10px_#FFD500]">
              <RatingWidget rating={correction} />

              <span className="text-sm text-gray-500 dark:text-inherit font-segoe">Correction</span>
              
            </div>
            {typeof cCount === 'number' && (
              <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M2 11a1 1 0 112 0v6a1 1 0 11-2 0v-6zm5-5a1 1 0 112 0v11a1 1 0 11-2 0V6zm5 8a1 1 0 112 0v3a1 1 0 11-2 0v-3zm5-10a1 1 0 112 0v13a1 1 0 11-2 0V4z" />
                </svg>
                {cCount}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
