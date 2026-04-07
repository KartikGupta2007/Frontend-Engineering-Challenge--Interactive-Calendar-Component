import { CalendarHeader } from './CalendarHeader';
import { DayGrid } from './DayGrid';

export function CalendarWidget() {
  return (
    <div className="w-full h-full bg-white flex flex-col z-10 relative">
      <CalendarHeader />
      <DayGrid />
    </div>
  );
}
