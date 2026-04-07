import React, { useEffect } from 'react';
import { DayCell } from './DayCell';
import { useCalendarGrid } from '../../hooks/useCalendarGrid';
import { useCalendarContext } from '../../context/CalendarContext';
import { isSameMonth, isSameDay, isWithinInterval } from 'date-fns';
import { normalizeDateRange } from '../../utils/dateUtils';

export function DayGrid() {
  const gridDays = useCalendarGrid();
  const { state, dispatch } = useCalendarContext();
  const { currentViewContext, selection } = state;
  const { startDate, endDate, hoverDate, isDragging } = selection;

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      if (isDragging) {
        dispatch({ type: 'DRAG_END' });
      }
    };
    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => window.removeEventListener('mouseup', handleMouseUpGlobal);
  }, [isDragging, dispatch]);

  const getDayFlags = (day) => {
    const isOtherMonth = !isSameMonth(day, currentViewContext);
    const isStart = startDate ? isSameDay(day, startDate) : false;
    const isEnd = endDate ? isSameDay(day, endDate) : false;

    let isBetween = false;

    if (startDate && endDate) {
       const range = normalizeDateRange(startDate, endDate);
       // we are comparing the start/end of day logically or just using pure isWithinInterval
       // isWithinInterval handles boundaries, but we explicitly rule out isStart/isEnd styling
       isBetween = isWithinInterval(day, range) && !isStart && !isEnd;
    } 
    else if (startDate && hoverDate) {
       const range = normalizeDateRange(startDate, hoverDate);
       isBetween = isWithinInterval(day, range) && !isStart && !isSameDay(day, hoverDate);
    }

    return { isOtherMonth, isStart, isEnd, isBetween };
  };

  return (
    <div className="w-full grow flex flex-col">
      <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="py-2.5 sm:py-3 text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest" style={{ color: '#374151' }}>
            {d}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 grow">
        {gridDays.map((day) => {
          const flags = getDayFlags(day);
          return (
             <DayCell 
                key={day.toISOString()} 
                day={day} 
                {...flags} 
             />
          );
        })}
      </div>
    </div>
  );
}
