import React from 'react';
import { HeroSection } from '../hero/HeroSection';
import { CalendarWidget } from '../calendar/CalendarWidget';
import { NotesSection } from '../notes/NotesSection';
import { AnimatePresence, motion } from 'framer-motion';
import { useCalendarContext } from '../../context/CalendarContext';

export function WallCalendarLayout() {
  const { state } = useCalendarContext();

  // Use the view context as a key to trigger the flip animation!
  const monthKey = state.currentViewContext.toISOString();

  return (
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[#F3F4F6] flex items-center justify-center p-4 md:p-12 overflow-hidden font-sans perspective-[1500px]">

      <div className="relative w-full max-w-5xl z-10 drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)] flex flex-col perspective-distant">

        {/* Top Paper: Hero Section (with 3D Flip Anim) */}
        <div className="relative w-full h-56 sm:h-80 md:h-[400px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`hero-${monthKey}`}
              initial={{ rotateX: 90, opacity: 0.5, transformOrigin: "bottom" }}
              animate={{ rotateX: 0, opacity: 1, zIndex: 10 }}
              exit={{ rotateX: -90, opacity: 0.5, zIndex: 5 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.15 }}
              className="absolute inset-0 w-full h-full bg-white rounded-t-2xl overflow-hidden shadow-[inset_0_-10px_20px_rgba(0,0,0,0.1)] border-b border-black/10 origin-bottom"
            >
              <HeroSection />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Spiral Binding ────────────────────────────────────────────────────
            Centered exactly on the seam between hero and calendar body.
            Each ring = outer metallic oval + inner hole cutout.
            Inline styles used to guarantee gradient/shadow rendering.           */}
        <div
          className="spiral-bar absolute w-full z-50 pointer-events-none"
          style={{
            top:            'calc(224px - 16px)',
            display:        'flex',
            justifyContent: 'space-evenly',
            alignItems:     'center',
            padding:        '0 20px',
          }}
        >
          <style>{`
            @media (min-width: 640px) { .spiral-bar { top: calc(320px - 16px) !important; } }
            @media (min-width: 768px) { .spiral-bar { top: calc(400px - 16px) !important; } }
          `}</style>

          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              style={{
                position:     'relative',
                width:        '22px',
                height:       '32px',
                flexShrink:   0,
              }}
            >
              {/* Outer metallic ring — chrome gradient gives 3-D arc impression */}
              <div style={{
                position:     'absolute',
                inset:        0,
                borderRadius: '11px',
                background:   'linear-gradient(160deg, #f5f5f5 0%, #d4d4d4 20%, #888 45%, #b0b0b0 65%, #e8e8e8 85%, #c8c8c8 100%)',
                boxShadow:    '0 4px 10px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.7)',
              }} />

              {/* Inner hole — dark with inset shadow for depth */}
              <div style={{
                position:     'absolute',
                top:          '5px',
                left:         '5px',
                right:        '5px',
                bottom:       '5px',
                borderRadius: '6px',
                background:   'linear-gradient(135deg, #1a1a1a 0%, #333 40%, #111 100%)',
                boxShadow:    'inset 0 2px 5px rgba(0,0,0,0.9), inset 0 -1px 2px rgba(255,255,255,0.05)',
              }} />
            </div>
          ))}
        </div>

        {/* Bottom Paper: Calendar & Notes
            ─ position:relative so the absolute notes overlay can anchor to it
            ─ Calendar grid drives the natural height
            ─ Notes panel overlays the right side absolutely (zero layout influence) */}
        <div className="w-full bg-[#fdfbf7] rounded-b-2xl shadow-[inset_0_10px_20px_rgba(0,0,0,0.05)] relative z-10 pt-4 md:pt-6 pb-2 px-2 md:px-4">

          {/* Calendar Grid — takes full width on mobile, reserves right 35% on desktop */}
          <div className="md:pr-[35%] md:border-r border-gray-200/60 pt-2">
            <CalendarWidget />
          </div>

          {/* Notes column (desktop) — absolutely pinned to right side, height = calendar's height */}
          <div className="hidden md:flex flex-col absolute top-0 right-0 bottom-0 w-[35%] overflow-hidden pt-4 md:pt-6 pb-2">
            <NotesSection />
          </div>

          {/* Notes section (mobile) — normal flow below the calendar grid */}
          <div className="md:hidden border-t border-gray-200/60 mt-2">
            <NotesSection />
          </div>

        </div>


      </div>
    </div>
  );
}
