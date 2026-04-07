import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { calendarReducer, initialState } from './calendarReducer';

const CalendarStateContext = createContext(null);
const CalendarDispatchContext = createContext(null);

export function CalendarProvider({ children }) {
  const [state, dispatch] = useReducer(calendarReducer, initialState, (initial) => {
    try {
      const savedNotes = localStorage.getItem('calendarNotes');
      if (savedNotes) {
        return { ...initial, notes: JSON.parse(savedNotes) };
      }
    } catch (err) {
      console.warn("Failed to load notes from localStorage", err);
    }
    return initial;
  });

  // Save notes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('calendarNotes', JSON.stringify(state.notes));
  }, [state.notes]);

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <CalendarStateContext.Provider value={state}>
      <CalendarDispatchContext.Provider value={dispatch}>
        {children}
      </CalendarDispatchContext.Provider>
    </CalendarStateContext.Provider>
  );
}

export function useCalendarState() {
  const context = useContext(CalendarStateContext);
  if (context === undefined) {
    throw new Error('useCalendarState must be used within a CalendarProvider');
  }
  return context;
}

export function useCalendarDispatch() {
  const context = useContext(CalendarDispatchContext);
  if (context === undefined) {
    throw new Error('useCalendarDispatch must be used within a CalendarProvider');
  }
  return context;
}

export function useCalendarContext() {
  const state = useCalendarState();
  const dispatch = useCalendarDispatch();
  return { state, dispatch };
}
