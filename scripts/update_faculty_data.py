import json
from pathlib import Path

root = Path(__file__).resolve().parent.parent
processed_path = root / 'processed.json'
output_path = root / 'src' / 'data' / 'faculty.json'

def main():
    data = json.loads(processed_path.read_text())
    faculty_list = []
    for fid, info in data.items():
        if 'name' not in info:
            continue
        teaching_count = info.get('num_teaching_ratings', 0)
        attendance_count = info.get('num_attendance_ratings', 0)
        correction_count = info.get('num_correction_ratings', 0)
        def avg(total, count):
            return round(total / count, 2) if count else 0.0
        faculty_list.append({
            'id': fid,
            'name': info.get('name'),
            'dept': info.get('specialization'),
            'photo': info.get('image_url'),
            'avgRating': round(
                (
                    avg(info.get('teaching_rating',0), teaching_count)+
                    avg(info.get('attendance_rating',0), attendance_count)+
                    avg(info.get('correction_rating',0), correction_count)
                )/3, 2
            ),
            'ratingsCount': teaching_count + attendance_count + correction_count,
            'teachingRating': avg(info.get('teaching_rating',0), teaching_count),
            'attendanceRating': avg(info.get('attendance_rating',0), attendance_count),
            'correctionRating': avg(info.get('correction_rating',0), correction_count),
            'email': info.get('email'),
            'phone': info.get('phone'),
            'cabin': info.get('cabin'),
        })
    output_path.write_text(json.dumps(faculty_list, indent=2))

if __name__ == '__main__':
    main()
