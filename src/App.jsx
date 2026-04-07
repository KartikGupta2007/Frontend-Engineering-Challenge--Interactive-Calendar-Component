import React from 'react';
import { CalendarProvider } from './context/CalendarContext';
import { WallCalendarLayout } from './components/layout/WallCalendarLayout';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <CalendarProvider>
        <WallCalendarLayout />
      </CalendarProvider>
    </ErrorBoundary>
  );
}

export default App;
