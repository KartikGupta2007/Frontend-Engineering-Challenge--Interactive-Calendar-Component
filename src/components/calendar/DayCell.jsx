import React, { memo, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { useCalendarContext } from '../../context/CalendarContext';
import { isToday, format } from 'date-fns';

export const DayCell = memo(({ day, isOtherMonth, isStart, isEnd, isBetween }) => {
  const { dispatch } = useCalendarContext();
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
        isOtherMonth && "other-month",
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
      {/* Date number — absolutely positioned top-right, consistent across all states */}
      <div className={clsx(
        "absolute top-2 right-2 sm:top-3 sm:right-3 z-20",
        "w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full",
        today && !isStart && !isEnd && "bg-pink-100",
        today && (isStart || isEnd) && "ring-3 ring-white/50 ring-offset-2 ring-offset-pink-500"
      )}>
        <span
          className={clsx(
            "text-sm sm:text-base font-bold leading-none",
            today && !isStart && !isEnd && "font-extrabold!"
          )}
          style={{
            color: (isStart || isEnd) ? '#ffffff'
                 : isOtherMonth       ? '#9ca3af'
                 : today              ? '#9d174d'
                 :                      '#111827'
          }}
        >
          {dayNumber}
        </span>
      </div>

      {(isStart || isEnd) && (
        <div className="absolute inset-1 bg-white/20 rounded-md -z-10 pointer-events-none shadow-sm"></div>
      )}
    </div>
  );
});
