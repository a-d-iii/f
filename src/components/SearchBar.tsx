import { useState, useEffect, useRef } from "react";

import FacultyRatings from "./FacultyRatings.tsx";
import RateFaculty from "./RateFaculty.tsx";
import HeartButton from "./HeartButton.tsx";

interface ListItem {
  name: string;
  photo_url: string | null;
  specialization: string | null;
  teaching_rating: number | null;
  attendance_rating: number | null;
  correction_rating: number | null;
  total_ratings: number | null;
}


export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ListItem[]>([]);
  const [allResults, setAllResults] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [teachingFilter, setTeachingFilter] = useState(0);
  const [attendanceFilter, setAttendanceFilter] = useState(0);
  const [correctionFilter, setCorrectionFilter] = useState(0);
  const [displayResults, setDisplayResults] = useState<ListItem[]>([]);

  const filterRef = useRef<HTMLFormElement | null>(null);
  const filterButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        showFilters &&
        filterRef.current &&
        !filterRef.current.contains(e.target as Node) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(e.target as Node)
      ) {
        setShowFilters(false);
      }
    }
 
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showFilters]);

  useEffect(() => {
    if (
      !query.trim() &&
      teachingFilter === 0 &&
      attendanceFilter === 0 &&
      correctionFilter === 0
    ) {
      setResults([]);
      setAllResults([]);
      return;
    }

    const ctrl = { cancelled: false };
    setLoading(true);
    setError(null);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/lists');
        if (!res.ok) throw new Error('Failed to fetch lists');
        const data: ListItem[] = (await res.json()) || [];

        if (ctrl.cancelled) return;

        let list = data.filter((item) => item.name && item.name.trim() !== "");
        if (query.trim()) {
          const term = query.toLowerCase();
          list = list.filter((item) => item.name.toLowerCase().includes(term));
        }

        setAllResults(list);
        setResults(list);
      } catch (err: any) {
        if (ctrl.cancelled) return;
        setError(err.message);
        setResults([]);
        setAllResults([]);
      }
      setLoading(false);
    }, 300);

    return () => {
      ctrl.cancelled = true;
      clearTimeout(timer);
    };
  }, [query, teachingFilter, attendanceFilter, correctionFilter]);

  useEffect(() => {
    let filtered = allResults.filter((f) => f.name && f.name.trim() !== "");

    if (teachingFilter > 0) {
      filtered = filtered.filter(
        (f) => (f.teaching_rating ?? 0) >= teachingFilter,
      );
    }
    if (attendanceFilter > 0) {
      filtered = filtered.filter(
        (f) => (f.attendance_rating ?? 0) >= attendanceFilter,
      );
    }
    if (correctionFilter > 0) {
      filtered = filtered.filter(
        (f) => (f.correction_rating ?? 0) >= correctionFilter,
      );
    }
    setResults(filtered);
  }, [allResults, teachingFilter, attendanceFilter, correctionFilter]);

  useEffect(() => {
    setDisplayResults(results);
  }, [results]);
 
  return (
    <div className="mb-6 w-full">
      <input
        type="text"
        className="w-full h-12 px-4 rounded-md border border-[#1E2230] mb-4 bg-white text-gray-800 placeholder-gray-500 dark:bg-[#0A0F1E] dark:text-[#E4E9F0] dark:placeholder-[#5A5F7D] focus:outline-none focus:ring-2 focus:ring-[#00FFD8]"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="mb-4 text-left w-full">
        <div className="flex gap-2">
          <div className="relative">
            <button
              type="button"
              ref={filterButtonRef}
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-2 rounded-md bg-seablue text-white dark:bg-[#1E2230] hover:bg-blue-600 dark:hover:bg-[#374151]"
            >
              Filter
            </button>
            {showFilters && (
              <form
                ref={filterRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowFilters(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setShowFilters(false);
                  }
                }}
                className="absolute z-10 mt-2 w-64 p-4 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-[#0A0F1E] dark:border-gray-700"
              >
                <div className="mb-3">
                  <label className="block text-sm font-semibold mb-1 dark:text-gray-200">
                    Teaching rating
                  </label>
                  <select
                    className="w-full p-2 border rounded-md bg-white dark:bg-[#1E2230] border-gray-300 dark:border-gray-600 dark:text-gray-100"
                    value={teachingFilter}
                    onChange={(e) => setTeachingFilter(Number(e.target.value))}
                  >
                    <option value={0}>Any</option>
                    <option value={5}>5 & up</option>
                    <option value={4}>4 & up</option>
                    <option value={3}>3 & up</option>
                    <option value={2}>2 & up</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-semibold mb-1 dark:text-gray-200">
                    Attendance rating
                  </label>
                  <select
                    className="w-full p-2 border rounded-md bg-white dark:bg-[#1E2230] border-gray-300 dark:border-gray-600 dark:text-gray-100"
                    value={attendanceFilter}
                    onChange={(e) =>
                      setAttendanceFilter(Number(e.target.value))
                    }
                  >
                    <option value={0}>Any</option>
                    <option value={5}>5 & up</option>
                    <option value={4}>4 & up</option>
                    <option value={3}>3 & up</option>
                    <option value={2}>2 & up</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-semibold mb-1 dark:text-gray-200">
                    Correction rating
                  </label>
                  <select
                    className="w-full p-2 border rounded-md bg-white dark:bg-[#1E2230] border-gray-300 dark:border-gray-600 dark:text-gray-100"
                    value={correctionFilter}
                    onChange={(e) =>
                      setCorrectionFilter(Number(e.target.value))
                    }
                  >
                    <option value={0}>Any</option>
                    <option value={5}>5 & up</option>
                    <option value={4}>4 & up</option>
                    <option value={3}>3 & up</option>
                    <option value={2}>2 & up</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-3 w-full px-3 py-2 rounded-md bg-seablue text-white dark:bg-[#1E2230] hover:bg-blue-600 dark:hover:bg-[#374151]"
                >
                  Apply
                </button>
              </form>
            )}
          </div>
        </div>
 
      </div>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading &&
        !error &&
        (query.trim() ||
          teachingFilter > 0 ||
          attendanceFilter > 0 ||
          correctionFilter > 0) &&
        displayResults.length === 0 && (
          <p className="text-gray-500">No results found.</p>
        )}
      {/* Display search results using same layout as the homepage */}

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 w-fit mx-auto">
        {displayResults.map((item) => (
          <article
            key={item.name}
            className="card pb-32 dark:pb-6 card-wrapper dark:backdrop-blur-lg dark:bg-opacity-5 dark:border dark:border-opacity-20 dark:rounded-2xl dark:p-6"
          >
            <div className="flex items-start gap-4 mb-2 h-40 dark:h-auto">
              <div className="photo-wrapper">
                <img
                  src={
                    item.photo_url ||
                    "https://placehold.co/300x400?text=No+Photo"
                  }
                  alt={`Photo of ${item.name}`}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = "https://placehold.co/300x400?text=No+Photo";
                    target.onerror = null;
                  }}
                  className="faculty-photo"
                />
              </div>
              <div className="flex flex-col flex-1 h-40 dark:h-auto overflow-hidden">
                <h3 className="text-lg font-bold mb-1 clamp-two-lines faculty-name font-poppins dark:text-[#E4E9F0] dark:text-2xl dark:font-medium">
                  {item.name}
                </h3>
                {item.specialization && (
                  <p className="text-sm italic text-gray-400 leading-snug overflow-hidden flex-grow clamp-four-lines font-segoe dark:text-[#CDD2E0] dark:font-normal mt-1">
                    {item.specialization}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <FacultyRatings
                teaching={item.teaching_rating ?? 0}
                attendance={item.attendance_rating ?? 0}
                correction={item.correction_rating ?? 0}
                quiz={item.quiz_rating ?? 0}
                tCount={item.total_ratings ?? null}
                aCount={item.total_ratings ?? null}
                cCount={item.total_ratings ?? null}
                qCount={item.total_ratings ?? null}
              />
            </div>
            <RateFaculty />
            <HeartButton faculty={item} />
          </article>
        ))}
      </div>
      {displayResults.length > 0 && (
        <hr className="my-8 mx-auto w-1/2 border-t-2 border-dashed border-gray-400" />
      )}
    </div>
  );
}
