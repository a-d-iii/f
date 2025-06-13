import type { FC, JSX } from 'react';

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

const icons: Record<string, JSX.Element> = {
  Teaching: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M4.25933 10.1466C3.98688 12.2307 3.82139 14.3483 3.76853 16.494C6.66451 17.703 9.41893 19.1835 12 20.9036C14.5811 19.1835 17.3355 17.703 20.2315 16.494C20.1786 14.3484 20.0131 12.2307 19.7407 10.1467M4.25933 10.1466C3.38362 9.85232 2.49729 9.58107 1.60107 9.3337C4.84646 7.05887 8.32741 5.0972 12 3.49255C15.6727 5.0972 19.1536 7.05888 22.399 9.33371C21.5028 9.58109 20.6164 9.85233 19.7407 10.1467M4.25933 10.1466C6.94656 11.0499 9.5338 12.1709 12.0001 13.4886C14.4663 12.1709 17.0535 11.0499 19.7407 10.1467M6.75 15C7.16421 15 7.5 14.6642 7.5 14.25C7.5 13.8358 7.16421 13.5 6.75 13.5C6.33579 13.5 6 13.8358 6 14.25C6 14.6642 6.33579 15 6.75 15ZM6.75 15V11.3245C8.44147 10.2735 10.1936 9.31094 12 8.44329M4.99264 19.9926C6.16421 18.8211 6.75 17.2855 6.75 15.75V14.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Attendance: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.25736 4.00736 5.25 5.25 5.25H18.75C19.9926 5.25 21 6.25736 21 7.5V18.75M3 18.75C3 19.9926 4.00736 21 5.25 21H18.75C19.9926 21 21 19.9926 21 18.75M3 18.75V11.25C3 10.0074 4.00736 9 5.25 9H18.75C19.9926 9 21 10.0074 21 11.25V18.75M12 12.75H12.0075V12.7575H12V12.75ZM12 15H12.0075V15.0075H12V15ZM12 17.25H12.0075V17.2575H12V17.25ZM9.75 15H9.7575V15.0075H9.75V15ZM9.75 17.25H9.7575V17.2575H9.75V17.25ZM7.5 15H7.5075V15.0075H7.5V15ZM7.5 17.25H7.5075V17.2575H7.5V17.25ZM14.25 12.75H14.2575V12.7575H14.25V12.75ZM14.25 15H14.2575V15.0075H14.25V15ZM14.25 17.25H14.2575V17.2575H14.25V17.25ZM16.5 12.75H16.5075V12.7575H16.5V12.75ZM16.5 15H16.5075V15.0075H16.5V15Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Correction: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M16.8617 4.48667L18.5492 2.79917C19.2814 2.06694 20.4686 2.06694 21.2008 2.79917C21.9331 3.53141 21.9331 4.71859 21.2008 5.45083L10.5822 16.0695C10.0535 16.5981 9.40144 16.9868 8.68489 17.2002L6 18L6.79978 15.3151C7.01323 14.5986 7.40185 13.9465 7.93052 13.4178L16.8617 4.48667ZM16.8617 4.48667L19.5 7.12499M18 14V18.75C18 19.9926 16.9926 21 15.75 21H5.25C4.00736 21 3 19.9926 3 18.75V8.24999C3 7.00735 4.00736 5.99999 5.25 5.99999H10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const RatingBar: FC<Props> = ({ rating, label }) => {
  const value = typeof rating === 'number' ? rating : 0;
  const { bg, text } = getColor(value);
  const width = `${Math.min(Math.max(value, 0), 5) / 5 * 100}%`;
  const icon = icons[label] || null;
  return (
    <div className="w-full my-1 drop-shadow-lg">
      <div className="flex justify-between items-baseline px-1">
        <span className={`flex items-center gap-1 text-sm font-semibold drop-shadow-md ${text}`}>{icon}{label}</span>
        <span className={`text-base font-bold drop-shadow-md ${text}`}>{value.toFixed(1)}</span>
      </div>
      <div className="w-11/12 mx-auto h-2 rounded bg-gray-300 dark:bg-gray-700 overflow-hidden shadow-2xl drop-shadow-xl">
        <div className={`${bg} h-full shadow-inner brightness-110`} style={{ width }}></div>
      </div>
    </div>
  );
};

export default RatingBar;
