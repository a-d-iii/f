import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

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

const supabaseUrl =
  (import.meta as any).env.PUBLIC_SUPABASE_URL ||
  "https://dwyojdeyfaozeeplpbyr.supabase.co";
const supabaseAnonKey =
  (import.meta as any).env.PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3eW9qZGV5ZmFvemVlcGxwYnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTY5MTMsImV4cCI6MjA2NTM3MjkxM30.A3EWWal-iREIyXX6j2F5Dzdi9KBTJQXAF1GHVcpDHY8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  const [showSort, setShowSort] = useState(false);
 
  const [sortOption, setSortOption] = useState("default");
 

  const sortRef = useRef<HTMLDivElement | null>(null);
  const sortButtonRef = useRef<HTMLButtonElement | null>(null);

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
      if (
        showSort &&
        sortRef.current &&
        !sortRef.current.contains(e.target as Node) &&
        sortButtonRef.current &&
        !sortButtonRef.current.contains(e.target as Node)
      ) {
        setShowSort(false);
      }
    }
 
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
 
  }, [showFilters, showSort]);

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
      const { data, error } = await supabase.from("lists").select("*");

      if (ctrl.cancelled) return;
      if (error) {
        setError(error.message);
        setResults([]);
        setAllResults([]);
      } else {
        let list = ((data as ListItem[]) || []).filter(
          (item) => item.name && item.name.trim() !== "",
        );
        if (query.trim()) {
          const term = query.toLowerCase();
          list = list.filter((item) => item.name.toLowerCase().includes(term));
        }

        setAllResults(list);
        setResults(list);
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
    let sorted = [...results];
    const sortByNumber = (key: keyof ListItem, asc = true) => {
      sorted.sort((a, b) => {
        const av = (a[key] as number | null) ?? 0;
        const bv = (b[key] as number | null) ?? 0;
        return asc ? av - bv : bv - av;
      });
    };
    switch (sortOption) {
 
      case "default":
        break;
      case "nameAsc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "teachHigh":
        sortByNumber("teaching_rating", false);
        break;
      case "teachLow":
        sortByNumber("teaching_rating", true);
        break;
      case "attendHigh":
        sortByNumber("attendance_rating", false);
        break;
      case "attendLow":
        sortByNumber("attendance_rating", true);
        break;
      case "correctHigh":
        sortByNumber("correction_rating", false);
        break;
      case "correctLow":
        sortByNumber("correction_rating", true);
        break;
      case "ratingsHigh":
        sortByNumber("total_ratings", false);
        break;
      case "ratingsLow":
        sortByNumber("total_ratings", true);
 
        break;
      default:
        break;
    }
    setDisplayResults(sorted);

    if (sorted.length === 0) {
 
      const container = document.getElementById("home-cards");
      if (container) {
        const children = Array.from(container.children) as HTMLElement[];
        const getNum = (el: HTMLElement, key: string) =>
          parseFloat(el.dataset[key] || "0");
        children.sort((a, b) => {
          switch (sortOption) {
            case "default":
              return (
                parseInt(a.dataset.index || "0") -
                parseInt(b.dataset.index || "0")
              );
            case "nameAsc":
              return (a.dataset.name || "").localeCompare(b.dataset.name || "");
            case "nameDesc":
              return (b.dataset.name || "").localeCompare(a.dataset.name || "");
            case "teachHigh":
              return getNum(b, "teach") - getNum(a, "teach");
            case "teachLow":
              return getNum(a, "teach") - getNum(b, "teach");
            case "attendHigh":
              return getNum(b, "attend") - getNum(a, "attend");
            case "attendLow":
              return getNum(a, "attend") - getNum(b, "attend");
            case "correctHigh":
              return getNum(b, "correct") - getNum(a, "correct");
            case "correctLow":
              return getNum(a, "correct") - getNum(b, "correct");
            case "ratingsHigh":
              return getNum(b, "total") - getNum(a, "total");
            case "ratingsLow":
              return getNum(a, "total") - getNum(b, "total");
 
            default:
              return 0;
          }
        });
 
        container.innerHTML = "";
 
        children.forEach((c) => container.appendChild(c));
      }
    }
  }, [results, sortOption]);
 
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
                  setSortOption("default");
                  setShowSort(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setShowFilters(false);
                    setSortOption("default");
                    setShowSort(false);
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
          <div className="relative">
            <button
              type="button"
              ref={sortButtonRef}
              onClick={() => setShowSort(!showSort)}
              className="px-3 py-2 rounded-md bg-seablue text-white dark:bg-[#1E2230] hover:bg-blue-600 dark:hover:bg-[#374151]"
            >
              Sort
            </button>
            {showSort && (
              <div
                ref={sortRef}
                className="absolute z-10 mt-2 w-48 p-4 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-[#0A0F1E] dark:border-gray-700"
              >
                <ul className="space-y-2">
                  <li>
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        setSortOption("default");
                        setShowSort(false);
                      }}
                    >
                      Default
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        setSortOption("nameAsc");
                        setShowSort(false);
                      }}
                    >
                      Name A-Z
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        setSortOption("nameDesc");
                        setShowSort(false);
                      }}
                    >
                      Name Z-A
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        setSortOption("teachHigh");
                        setShowSort(false);
                      }}
                    >
                      Teaching high-low
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        setSortOption("teachLow");
                        setShowSort(false);
                      }}
                    >
                      Teaching low-high
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        setSortOption("attendHigh");
                        setShowSort(false);
                      }}
                    >
                      Attendance high-low
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        setSortOption("attendLow");
                        setShowSort(false);
                      }}
                    >
                      Attendance low-high
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        setSortOption("correctHigh");
                        setShowSort(false);
                      }}
                    >
                      Correction high-low
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        setSortOption("correctLow");
                        setShowSort(false);
                      }}
                    >
                      Correction low-high
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        setSortOption("ratingsHigh");
                        setShowSort(false);
                      }}
                    >
                      Most ratings
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        setSortOption("ratingsLow");
                        setShowSort(false);
                      }}
                    >
                      Fewest ratings
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              ref={sortButtonRef}
              onClick={() => setShowSort(!showSort)}
              className="px-3 py-2 rounded-md bg-seablue text-white dark:bg-[#1E2230] hover:bg-blue-600 dark:hover:bg-[#374151]"
            >
              Sort
            </button>
            {showSort && (
              <div
                ref={sortRef}
                className="absolute z-10 mt-2 w-48 p-4 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-[#0A0F1E] dark:border-gray-700"
              >
                <ul className="space-y-2">
                  <li>
                    <button className="w-full text-left" onClick={() => { setSortOption('nameAsc'); setShowSort(false); }}>Name A-Z</button>
                  </li>
                  <li>
                    <button className="w-full text-left" onClick={() => { setSortOption('nameDesc'); setShowSort(false); }}>Name Z-A</button>
                  </li>
                  <li>
                    <button className="w-full text-left" onClick={() => { setSortOption('teachHigh'); setShowSort(false); }}>Teaching high-low</button>
                  </li>
                  <li>
                    <button className="w-full text-left" onClick={() => { setSortOption('teachLow'); setShowSort(false); }}>Teaching low-high</button>
                  </li>
                  <li>
                    <button className="w-full text-left" onClick={() => { setSortOption('attendHigh'); setShowSort(false); }}>Attendance high-low</button>
                  </li>
                  <li>
                    <button className="w-full text-left" onClick={() => { setSortOption('attendLow'); setShowSort(false); }}>Attendance low-high</button>
                  </li>
                  <li>
                    <button className="w-full text-left" onClick={() => { setSortOption('correctHigh'); setShowSort(false); }}>Correction high-low</button>
                  </li>
                  <li>
                    <button className="w-full text-left" onClick={() => { setSortOption('correctLow'); setShowSort(false); }}>Correction low-high</button>
                  </li>
                  <li>
                    <button className="w-full text-left" onClick={() => { setSortOption('ratingsHigh'); setShowSort(false); }}>Most ratings</button>
                  </li>
                  <li>
                    <button className="w-full text-left" onClick={() => { setSortOption('ratingsLow'); setShowSort(false); }}>Fewest ratings</button>
                  </li>
                </ul>
              </div>
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
                tCount={item.total_ratings ?? null}
                aCount={item.total_ratings ?? null}
                cCount={item.total_ratings ?? null}
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
