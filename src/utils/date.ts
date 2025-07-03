import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';

export function getCurrentWeekMap(today: Date = new Date()): Record<string, string> {
  const start = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const end = endOfWeek(today, { weekStartsOn: 1 }); // Sunday

  const days = eachDayOfInterval({ start, end });

  const weekMap: Record<string, string> = {};

  days.forEach(date => {
    const dayName = format(date, 'EEEE'); // Full day name e.g., "Monday"
    const formatted = format(date, 'dd MMM'); // e.g., "24 Jun"
    weekMap[dayName] = formatted;
  });

  return weekMap;
}
