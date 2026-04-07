import React from 'react';
import { CalendarProvider } from './context/CalendarContext';
import { WallCalendarLayout } from './components/layout/WallCalendarLayout';

function App() {
  return (
    <CalendarProvider>
      <WallCalendarLayout />
    </CalendarProvider>
  );
}

export default App;
