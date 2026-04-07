/**
 * Application Constants
 * 
 * Centralizing static string-keys, month names, and day names
 * for easy maintenance and elimination of magic strings.
 */

export const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const STORAGE_KEYS = {
  CALENDAR_NOTES: 'calendarNotes',
};

export const CALENDAR_ACTIONS = {
  NEXT_MONTH: 'NEXT_MONTH',
  PREV_MONTH: 'PREV_MONTH',
  SET_VIEW_CONTEXT: 'SET_VIEW_CONTEXT',
  DRAG_START: 'DRAG_START',
  DRAG_ENTER: 'DRAG_ENTER',
  DRAG_END: 'DRAG_END',
  UPDATE_NOTE: 'UPDATE_NOTE',
  BULK_APPEND_NOTE: 'BULK_APPEND_NOTE',
  HYDRATE_NOTES: 'HYDRATE_NOTES',
};
