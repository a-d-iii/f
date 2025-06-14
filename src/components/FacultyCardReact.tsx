import { useState } from 'react';
import FacultyRatings from './FacultyRatings.tsx';
import RateFaculty from './RateFaculty.tsx';
import HeartButton from './HeartButton.tsx';
import type { Faculty } from '../hooks/useWishlist';

export default function FacultyCardReact({ faculty }: { faculty: Faculty }) {
  const photoUrl = faculty.photo_url || (faculty as any).photo;
  const specializationRaw =
    faculty.specialization ||
    (faculty as any).specialisation ||
    (faculty as any).specializations ||
    (faculty as any).dept ||
    (faculty as any).department;

  let specialization = specializationRaw as string | undefined;
  if (specializationRaw) {
    const words = (specializationRaw as string).split(/\s+/);
    if (words.length > 12) {
      specialization = words.slice(0, 12).join(' ') + '...';
    }
  }

  const teachingCount =
    (faculty as any).num_teaching_ratings ??
    (faculty as any).numTeachingRatings ??
    (faculty as any).ratingsCount ??
    (faculty as any).total_ratings ??
    null;
  const attendanceCount =
    (faculty as any).num_attendance_ratings ??
    (faculty as any).numAttendanceRatings ??
    (faculty as any).ratingsCount ??
    (faculty as any).total_ratings ??
    null;
  const correctionCount =
    (faculty as any).num_correction_ratings ??
    (faculty as any).numCorrectionRatings ??
    (faculty as any).ratingsCount ??
    (faculty as any).total_ratings ??
    null;
  const quizCount =
    (faculty as any).num_quiz_ratings ??
    (faculty as any).numQuizRatings ??
    (faculty as any).ratingsCount ??
    (faculty as any).total_ratings ??
    null;

  const [color, setColor] = useState('hsl(210, 20%, 95%)');
  const lighten = () =>
    setColor((c) => {
      const match = /hsl\(\d+, \d+%, (\d+)%\)/.exec(c);
      const l = match ? parseInt(match[1], 10) : 95;
      return `hsl(210, 20%, ${Math.min(l + 5, 100)}%)`;
    });
  const darken = () =>
    setColor((c) => {
      const match = /hsl\(\d+, \d+%, (\d+)%\)/.exec(c);
      const l = match ? parseInt(match[1], 10) : 95;
      return `hsl(210, 20%, ${Math.max(l - 5, 0)}%)`;
    });
  const change = () => {
    const h = Math.floor(Math.random() * 360);
    setColor(`hsl(${h}, 30%, 90%)`);
  };

  return (
    <article className="card pb-32 dark:pb-6 card-wrapper dark:backdrop-blur-lg dark:bg-opacity-5 dark:border dark:border-opacity-20 dark:rounded-2xl dark:p-6">
      <div className="flex items-start gap-4 mb-2 h-40 dark:h-auto">
        <div className="photo-wrapper">
          <img
            src={photoUrl}
            alt={`Photo of ${faculty.name || 'Unknown'}`}
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.src = 'https://placehold.co/300x400?text=No+Photo';
              target.onerror = null;
            }}
            className="faculty-photo"
          />
        </div>
        <div className="flex flex-col flex-1 h-40 dark:h-auto overflow-hidden">
          <h3 className="text-lg font-bold mb-1 clamp-two-lines faculty-name font-poppins dark:text-[#E4E9F0] dark:text-2xl dark:font-medium">
            {faculty.name || 'Unknown'}
          </h3>
          {specialization && (
            <p className="text-sm italic text-gray-400 leading-snug overflow-hidden flex-grow clamp-four-lines font-segoe dark:text-[#CDD2E0] dark:font-normal mt-1">
              {specialization}
            </p>
          )}
        </div>
      </div>
      <hr className="border-t border-gray-300 dark:border-gray-700 my-2" />
      <div className="flex gap-2 mb-2">
        <button type="button" onClick={change} className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700">
          Change
        </button>
        <button type="button" onClick={lighten} className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700">
          Lighter
        </button>
        <button type="button" onClick={darken} className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700">
          Darker
        </button>
      </div>
      <div className="mb-4 p-2 rounded-md" style={{ backgroundColor: color }}>
        <FacultyRatings
          teaching={(faculty as any).teaching_rating ?? (faculty as any).teachingRating}
          attendance={(faculty as any).attendance_rating ?? (faculty as any).attendanceRating}
          correction={(faculty as any).correction_rating ?? (faculty as any).correctionRating}
          quiz={(faculty as any).quiz_rating ?? (faculty as any).quizRating}
          tCount={teachingCount}
          aCount={attendanceCount}
          cCount={correctionCount}
          qCount={quizCount}
          client:visible
        />
      </div>
      <RateFaculty client:visible />
      <HeartButton faculty={faculty} client:visible />
    </article>
  );
}
