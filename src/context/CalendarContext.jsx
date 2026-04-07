import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { calendarReducer, initialState } from './calendarReducer';

const CalendarContext = createContext(null);

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

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
}
