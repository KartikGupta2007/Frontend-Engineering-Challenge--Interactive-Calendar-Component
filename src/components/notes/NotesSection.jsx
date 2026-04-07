import React from 'react';
import { useCalendarContext } from '../../context/CalendarContext';
import { formatDateKey, normalizeDateRange } from '../../utils/dateUtils';
import { isSameDay, format, eachDayOfInterval } from 'date-fns';

export function NotesSection() {
  const { state, dispatch } = useCalendarContext();
  const { startDate, endDate } = state.selection;
  const [bulkText, setBulkText] = React.useState('');

  let noteKey = 'general';
  let title = 'General Memos';

  const isRange = startDate && endDate && !isSameDay(startDate, endDate);

  if (isRange) {
      title = `${format(startDate, 'MMMM d')} - ${format(endDate, 'MMMM d, yyyy')}`;
  } else if (startDate) {
      noteKey = formatDateKey(startDate);
      title = format(startDate, 'MMMM d, yyyy');
  } else {
      noteKey = `month-${state.currentViewContext.getFullYear()}-${state.currentViewContext.getMonth()}`;
      title = `${format(state.currentViewContext, 'MMMM yyyy')} Memos`;
  }

  const currentNotes = state.notes[noteKey] || '';

  React.useEffect(() => {
    setBulkText('');
  }, [startDate, endDate]);

  const handleChange = (e) => {
    dispatch({ type: 'UPDATE_NOTE', payload: { key: noteKey, text: e.target.value } });
  };



  return (
    <div className="p-4 sm:p-6 md:pl-8 flex flex-col h-full overflow-hidden min-h-0">
      <div className="flex justify-between items-end mb-1">
        <h3 className="text-xl sm:text-2xl font-handwriting font-bold text-gray-800 tracking-tight">{title}</h3>
      </div>
      <p className="text-[10px] text-gray-400 font-bold tracking-widest pb-3 border-b border-gray-300/50 uppercase">
        Notes Auto-Save
      </p>
      
      {isRange ? (() => {
        const dates = eachDayOfInterval(normalizeDateRange(startDate, endDate));
        const keys = dates.map(d => formatDateKey(d));
        return (
        <div className="calendar-notepad mt-1 flex flex-col pt-0 pb-4 overflow-y-auto flex-1 w-full min-h-0">
          {/* Master Bulk Insert Row */}
          <div className="flex w-full items-center bg-pink-50/40 rounded-t-sm shrink-0" style={{ height: '30px', minHeight: '30px', maxHeight: '30px' }}>
            <span className="w-14 shrink-0 text-[10px] font-bold text-pink-500 uppercase tracking-widest select-none leading-[30px] pl-1 whitespace-nowrap overflow-hidden">
               Add
            </span>
            <input 
               type="text"
               className="grow h-full bg-transparent outline-none font-handwriting text-lg text-pink-700 px-1 sm:px-2 placeholder-pink-300 min-w-0"
               value={bulkText}
               onChange={(e) => setBulkText(e.target.value)}
               onKeyDown={(e) => {
                 if (e.key === 'Enter' && bulkText.trim() !== '') {
                   dispatch({ type: 'BULK_APPEND_NOTE', payload: { keys, text: bulkText.trim() } });
                   setBulkText('');
                 }
               }}
               placeholder="Press Enter to append..."
            />
            <button 
               className="px-3 h-full flex items-center justify-center text-pink-500 font-bold hover:text-pink-700 hover:bg-pink-100 transition-colors rounded-tr-sm focus:outline-none shrink-0"
               onClick={() => {
                 if (bulkText.trim() !== '') {
                   dispatch({ type: 'BULK_APPEND_NOTE', payload: { keys, text: bulkText.trim() } });
                   setBulkText('');
                 }
               }}
               title="Add to all selected dates"
            >
              +
            </button>
          </div>

          {dates.map((date) => {
             const key = formatDateKey(date);
             return (
               <div key={key} className="flex w-full items-center shrink-0" style={{ height: '30px', minHeight: '30px', maxHeight: '30px' }}>
                 <span className="w-14 shrink-0 text-[11px] font-bold text-gray-400 capitalize tracking-wide select-none leading-[30px] pl-1 whitespace-nowrap overflow-hidden">
                    {format(date, 'MMM d')}
                 </span>
                 <input 
                    type="text"
                    className="grow h-full bg-transparent outline-none font-handwriting text-xl text-sky-900 px-2 placeholder-gray-400/30 min-w-0"
                    value={state.notes[key] || ''}
                    onChange={(e) => dispatch({ type: 'UPDATE_NOTE', payload: { key, text: e.target.value } })}
                    placeholder="..."
                 />
               </div>
             )
          })}
        </div>
        );
      })() : (
        <textarea
          className="calendar-notepad placeholder-gray-400/50"
          value={currentNotes}
          onChange={handleChange}
          placeholder="Write down memos, holidays, or errands..."
        ></textarea>
      )}
    </div>
  );
}
