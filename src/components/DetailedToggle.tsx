import { useEffect, useState } from 'react';

export default function DetailedToggle() {
  const [detailed, setDetailed] = useState<boolean>(
    typeof window !== 'undefined' && (window as any).showDetailedRatings === true
  );

  useEffect(() => {
    (window as any).showDetailedRatings = detailed;
    window.dispatchEvent(
      new CustomEvent('detailed-ratings-change', { detail: { show: detailed } })
    );
  }, [detailed]);

  return (
    <div className="flex justify-end mb-2">
      <button
        type="button"
        onClick={() => setDetailed(!detailed)}
        className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {detailed ? 'Compact ratings' : 'Detailed ratings'}
      </button>
    </div>
  );
}
