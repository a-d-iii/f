import FacultyRatings from './FacultyRatings.tsx';
import RateFaculty from './RateFaculty.tsx';
import HeartButton from './HeartButton.tsx';

interface Faculty {
  [key: string]: any;
}

export default function FacultyCardReact({ faculty }: { faculty: Faculty }) {
  const photoUrl = faculty.photo_url || faculty.photo;
  const specializationRaw =
    faculty.specialization ||
    faculty.specialisation ||
    faculty.specializations ||
    faculty.dept ||
    faculty.department;

  let specialization = specializationRaw;
  if (specializationRaw) {
    const words = String(specializationRaw).split(/\s+/);
    if (words.length > 12) {
      specialization = words.slice(0, 12).join(' ') + '...';
    }
  }

  const teachingCount =
    faculty.num_teaching_ratings ??
    faculty.numTeachingRatings ??
    faculty.ratingsCount ??
    faculty.total_ratings ??
    null;
  const attendanceCount =
    faculty.num_attendance_ratings ??
    faculty.numAttendanceRatings ??
    faculty.ratingsCount ??
    faculty.total_ratings ??
    null;
  const correctionCount =
    faculty.num_correction_ratings ??
    faculty.numCorrectionRatings ??
    faculty.ratingsCount ??
    faculty.total_ratings ??
    null;

  return (
    <article className="card pb-32">
      <div className="flex items-start gap-4 mb-2 h-40">
        <div className="photo-wrapper">
          <img
            src={photoUrl}
            alt={`Photo of ${faculty.name || 'Unknown'}`}
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.src = 'https://placehold.co/300x400?text=No+Photo';
            }}
            className="faculty-photo"
          />
        </div>
        <div className="flex flex-col flex-1 h-40 overflow-hidden">
          <h3 className="text-lg font-bold mb-1 clamp-two-lines faculty-name font-poppins">
            {faculty.name || 'Unknown'}
          </h3>
          {specialization && (
            <p className="text-sm italic text-gray-400 dark:text-gray-400 leading-snug overflow-hidden flex-grow clamp-four-lines font-segoe">
              {specialization}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <FacultyRatings
          teaching={faculty.teaching_rating ?? faculty.teachingRating}
          attendance={faculty.attendance_rating ?? faculty.attendanceRating}
          correction={faculty.correction_rating ?? faculty.correctionRating}
          tCount={teachingCount}
          aCount={attendanceCount}
          cCount={correctionCount}
        />
      </div>
      <RateFaculty />
      <HeartButton />
    </article>
  );
}
