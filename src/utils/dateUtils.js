import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

export function getCalendarGrid(viewDate) {
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  while (days.length < 42) {
    const lastDay = days[days.length - 1];
    days.push(new Date(lastDay.getTime() + 24 * 60 * 60 * 1000));
  }
  
  return days;
}

export function formatDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function normalizeDateRange(d1, d2) {
  if (!d1 || !d2) return { start: d1 || d2, end: d2 || d1 };
  const t1 = d1.getTime();
  const t2 = d2.getTime();
  return t1 < t2 ? { start: d1, end: d2 } : { start: d2, end: d1 };
}

