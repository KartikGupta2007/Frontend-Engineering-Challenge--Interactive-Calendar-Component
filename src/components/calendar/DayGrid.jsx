import React, { useEffect } from 'react';
import { DayCell } from './DayCell';
import { useCalendarGrid } from '../../hooks/useCalendarGrid';
import { useCalendarState, useCalendarDispatch } from '../../context/CalendarContext';
import { calculateDayFlags } from '../../utils/dateUtils';

export function DayGrid() {
  const gridDays = useCalendarGrid();
  const state = useCalendarState();
  const dispatch = useCalendarDispatch();
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
          const flags = calculateDayFlags(day, currentViewContext, selection);
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
