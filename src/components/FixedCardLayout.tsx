import FacultyRatings from './FacultyRatings';

// Simple faculty card using fixed width
export function FacultyCardExample() {
  return (
    <div className="card-wrapper rounded-lg shadow-lg bg-white dark:bg-gray-800 overflow-hidden p-4 flex flex-col gap-2">
      <img
        src="https://placehold.co/200x250"
        alt="Prof. Jane Doe"
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-lg font-semibold font-poppins">Prof. Jane Doe</h3>
      <p className="text-sm italic text-gray-500">Computer Science</p>
 
      <FacultyRatings teaching={4.5} attendance={4.2} correction={4.7} quiz={4.0} qCount={20} />
 
    </div>
  );
}

export default function FixedCardLayout() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Centered Layout</h2>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <FacultyCardExample key={`c${i}`} />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Left Aligned Layout</h2>
      <div className="flex flex-wrap justify-start gap-x-4 gap-y-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <FacultyCardExample key={`l${i}`} />
        ))}
      </div>
    </>
  );
}
