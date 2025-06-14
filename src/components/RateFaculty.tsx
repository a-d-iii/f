import { useState } from 'react';
import useDarkMode from '../hooks/useDarkMode';

function Star({ filled, onClick }: { filled: boolean; onClick: () => void }) {
  return (
    <svg
      onClick={onClick}
      className={`w-5 h-5 cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927a1 1 0 011.902 0l1.286 3.959a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.374 2.454a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.538 1.118L10 13.347l-3.374 2.454c-.782.57-1.837-.197-1.538-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.636 9.386c-.782-.57-.38-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.96z" />
    </svg>
  );
}

function StarRow({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium w-24">{label}</span>
      <div className="flex">
        {[1,2,3,4,5].map(i => (
          <Star key={i} filled={i <= value} onClick={() => onChange(i)} />
        ))}
      </div>
    </div>
  );
}

export default function RateFaculty() {
  const { isDark } = useDarkMode();
  const [open, setOpen] = useState(false);
  const [teaching, setTeaching] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [correction, setCorrection] = useState(0);
  const [ratedAverage, setRatedAverage] = useState<number | null>(null);

  const submit = () => {
    alert('Thanks for rating!');
    const avg = (teaching + attendance + correction) / 3;
    setRatedAverage(avg);
    setOpen(false);
    setTeaching(0);
    setAttendance(0);
    setCorrection(0);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
 
        className={`absolute bottom-2 left-2 px-2 py-0.5 rounded text-sm ${
          isDark
            ?
              'border border-[#FFD500] text-[#FFD500] hover:bg-[#FFD500]20 drop-shadow-[0_0_10px_#FFD500]'
            : ratedAverage === null
              ? 'bg-gray-400 text-white hover:bg-gray-500'
              : 'bg-yellow-300 text-gray-900'
        }`}
 
      >
        {ratedAverage === null ? 'Rate' : ratedAverage.toFixed(1)}
      </button>
    );
  }

  return (
 
    <div className="absolute bottom-2 left-2 flex flex-col gap-2 p-2 rounded bg-gray-100 dark:bg-gray-800 z-10">
 
      <StarRow label="Teaching" value={teaching} onChange={setTeaching} />
      <StarRow label="Attendance" value={attendance} onChange={setAttendance} />
      <StarRow label="Correction" value={correction} onChange={setCorrection} />
      <div className="flex gap-2 mt-1">
        <button
          type="button"
          onClick={submit}
          className="px-2 py-1 rounded bg-violet-600 text-white hover:bg-violet-700"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-2 py-1 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
