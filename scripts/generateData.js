import { readFileSync, writeFileSync } from 'fs';

const raw = JSON.parse(readFileSync('processed.json', 'utf8'));
const out = [];

for (const [id, f] of Object.entries(raw)) {
  if (!f.name) continue;
  const teachingCount = f.num_teaching_ratings || 0;
  const attendanceCount = f.num_attendance_ratings || 0;
  const correctionCount = f.num_correction_ratings || 0;

  const teachingAvg = teachingCount ? Number((f.teaching_rating / teachingCount).toFixed(2)) : 0;
  const attendanceAvg = attendanceCount ? Number((f.attendance_rating / attendanceCount).toFixed(2)) : 0;
  const correctionAvg = correctionCount ? Number((f.correction_rating / correctionCount).toFixed(2)) : 0;

  const totalScore = (f.teaching_rating || 0) + (f.attendance_rating || 0) + (f.correction_rating || 0);
  const totalCount = teachingCount + attendanceCount + correctionCount;
  const avgRating = totalCount ? Number((totalScore / totalCount).toFixed(2)) : 0;

  out.push({
    id,
    name: f.name,
    dept: f.specialization,
    photo: f.image_url,
    avgRating,
    ratingsCount: totalCount,
    email: f.email || null,
    phone: f.phone || null,
    cabin: f.cabin || null,
    teachingAvg,
    teachingCount,
    attendanceAvg,
    attendanceCount,
    correctionAvg,
    correctionCount
  });
}

writeFileSync('src/data/faculty.json', JSON.stringify(out, null, 2));
