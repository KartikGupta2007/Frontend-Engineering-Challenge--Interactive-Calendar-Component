import { normalizeDateRange } from '../utils/dateUtils';
import { isSameDay, addMonths, subMonths } from 'date-fns';

export const initialState = {
  currentViewContext: new Date(),
  selection: {
    startDate: null,
    endDate: null,
    hoverDate: null,
    isDragging: false,
  },
  notes: {}
};

export function calendarReducer(state, action) {
  switch (action.type) {
    case 'NEXT_MONTH':
      return { ...state, currentViewContext: addMonths(state.currentViewContext, 1) };
    case 'PREV_MONTH':
      return { ...state, currentViewContext: subMonths(state.currentViewContext, 1) };
    case 'SET_VIEW_CONTEXT':
      return { ...state, currentViewContext: action.payload };
    case 'DRAG_START': {
      const { date } = action.payload;
      return {
        ...state,
        selection: { 
          ...state.selection, 
          startDate: date, 
          endDate: null, 
          hoverDate: date,
          isDragging: true 
        }
      };
    }
    case 'DRAG_ENTER': {
      if (!state.selection.isDragging) return state;
      return {
        ...state,
        selection: { 
          ...state.selection, 
          hoverDate: action.payload 
        }
      };
    }
    case 'DRAG_END': {
      if (!state.selection.isDragging) return state;
      const { startDate, hoverDate } = state.selection;
      
      if (!startDate) {
         return {
           ...state,
           selection: { ...state.selection, isDragging: false, hoverDate: null }
         };
      }

      const fallBackHover = hoverDate || startDate;
      const { start, end } = normalizeDateRange(startDate, fallBackHover);
      
      return {
        ...state,
        selection: { 
          ...state.selection, 
          startDate: start, 
          endDate: end, 
          hoverDate: null,
          isDragging: false 
        }
      };
    }
    case 'UPDATE_NOTE': {
      const { key, text } = action.payload;
      return {
        ...state,
        notes: {
          ...state.notes,
          [key]: text
        }
      };
    }
    case 'BULK_APPEND_NOTE': {
      const { keys, text } = action.payload;
      const updatedNotes = { ...state.notes };
      keys.forEach(k => {
        const existingNote = updatedNotes[k];
        updatedNotes[k] = existingNote && existingNote.trim() !== '' 
          ? `${existingNote}, ${text}` 
          : text;
      });
      return {
        ...state,
        notes: updatedNotes
      };
    }
    case 'HYDRATE_NOTES': {
      return {
        ...state,
        notes: action.payload
      };
    }
    default:
      return state;
  }
}
