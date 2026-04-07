import { useMemo } from 'react';
import { getCalendarGrid } from '../utils/dateUtils';
import { useCalendarContext } from '../context/CalendarContext';

export function useCalendarGrid() {
  const { state } = useCalendarContext();
  const { currentViewContext } = state;

  return useMemo(() => getCalendarGrid(currentViewContext), [currentViewContext]);
}
