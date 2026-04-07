import { useCalendarContext } from '../../context/CalendarContext';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CalendarHeader() {
  const { state, dispatch } = useCalendarContext();

  return (
    <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-gray-100">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">
        {format(state.currentViewContext, 'MMMM')} <span className="font-light text-gray-400">{format(state.currentViewContext, 'yyyy')}</span>
      </h2>
      <div className="flex space-x-3">
        <button 
          onClick={() => dispatch({ type: 'PREV_MONTH' })}
          className="p-2.5 border border-gray-200 shadow-sm rounded-full bg-white hover:bg-gray-50 transition-all active:scale-95 text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => dispatch({ type: 'NEXT_MONTH' })}
          className="p-2.5 border border-gray-200 shadow-sm rounded-full bg-white hover:bg-gray-50 transition-all active:scale-95 text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
