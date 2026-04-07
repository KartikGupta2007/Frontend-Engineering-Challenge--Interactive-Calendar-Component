import React, { memo, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { useCalendarDispatch } from '../../context/CalendarContext';
import { isToday, format } from 'date-fns';

export const DayCell = memo(({ day, isOtherMonth, isStart, isEnd, isBetween }) => {
  const dispatch = useCalendarDispatch();
  const cellRef = useRef(null);

  const today = isToday(day);
  const dayNumber = format(day, 'd');
  const weekDay = day.getDay();

  // ── Mouse Events ──────────────────────────────────────────────
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    dispatch({ type: 'DRAG_START', payload: { date: day } });
  };

  const handleMouseEnter = () => {
    dispatch({ type: 'DRAG_ENTER', payload: day });
  };

  const handleMouseUp = () => {
    dispatch({ type: 'DRAG_END' });
  };

  // ── Touch Events (mobile / tablet) ────────────────────────────
  // React registers synthetic touch listeners as PASSIVE by default.
  // Passive listeners cannot call e.preventDefault(), which means
  // the browser scroll hijacks the touch gesture. We attach native
  // event listeners with { passive: false } via useRef + useEffect
  // to gain full control.
  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    dispatch({ type: 'DRAG_START', payload: { date: day } });
  }, [day, dispatch]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!el) return;
    // Walk up DOM to find the day-cell with a data-date attribute
    const cell = el.closest('[data-date]');
    if (!cell) return;
    const iso = cell.getAttribute('data-date');
    if (!iso) return;
    dispatch({ type: 'DRAG_ENTER', payload: new Date(iso) });
  }, [dispatch]);

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    dispatch({ type: 'DRAG_END' });
  }, [dispatch]);

  useEffect(() => {
    const el = cellRef.current;
    if (!el) return;
    const opts = { passive: false };
    el.addEventListener('touchstart', handleTouchStart, opts);
    el.addEventListener('touchmove', handleTouchMove, opts);
    el.addEventListener('touchend', handleTouchEnd, opts);
    return () => {
      el.removeEventListener('touchstart', handleTouchStart, opts);
      el.removeEventListener('touchmove', handleTouchMove, opts);
      el.removeEventListener('touchend', handleTouchEnd, opts);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div
      ref={cellRef}
      data-date={day.toISOString()}
      className={clsx(
        "day-cell hover:-translate-y-px hover:shadow-sm z-0 relative select-none",
        today && "today",
        isStart && "day-selected-start z-20!",
        isEnd && "day-selected-end z-20!",
        isBetween && "day-in-between",
        isBetween && weekDay === 0 && "first-of-week",
        isBetween && weekDay === 6 && "last-of-week"
      )}
      style={{ touchAction: 'none' }}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Date number — circle pill for normal dates, wider "1 Sep" pill for the 1st of each month */}
      <div className={clsx(
        "absolute top-2 right-2 sm:top-3 sm:right-3 z-20",
        "h-7 sm:h-8 flex items-center justify-center rounded-full",
        // Fixed circle for normal dates, auto-width pill for "1 Sep" style
        day.getDate() === 1 ? "px-2" : "w-7 sm:w-8",
        today && !isStart && !isEnd && "bg-pink-100",
        today && (isStart || isEnd) && "ring-3 ring-white/50 ring-offset-2 ring-offset-pink-500"
      )}>
        <span
          className={clsx(
            "text-sm sm:text-base font-bold leading-none whitespace-nowrap",
            today && !isStart && !isEnd && "font-extrabold!"
          )}
          style={{
            color: (isStart || isEnd) ? '#ffffff'
                 : today              ? '#9d174d'
                 :                      '#111827'
          }}
        >
          {day.getDate() === 1 ? format(day, 'd MMM') : dayNumber}
        </span>
      </div>

      {(isStart || isEnd) && (
        <div className="absolute inset-1 bg-white/20 rounded-md -z-10 pointer-events-none shadow-sm"></div>
      )}

    </div>
  );
});
