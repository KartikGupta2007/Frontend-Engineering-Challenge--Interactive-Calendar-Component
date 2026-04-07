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

      <div className="relative w-full max-w-4xl z-10 drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)] flex flex-col perspective-distant">

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

        {/* The Spiral Binder - Sits between the two halves */}
        <div className="absolute top-56 sm:top-80 md:top-100 -mt-6 w-full h-12 flex justify-evenly items-center z-50 pointer-events-none px-4 md:px-12">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="relative w-6 h-12">
              {/* Top Hole */}
              <div className="absolute top-1 left-1 w-4 h-3 bg-gray-900 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] opacity-90"></div>
              {/* Metallic Wire Ring */}
              <div className="absolute top-0 left-2.5 w-1.5 h-12 bg-linear-to-r from-gray-400 via-gray-200 to-gray-500 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.3)] border border-black/20"></div>
              {/* Bottom Hole */}
              <div className="absolute bottom-1 left-1 w-4 h-3 bg-gray-900 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] opacity-90"></div>
            </div>
          ))}
        </div>

        {/* Bottom Paper: Calendar & Notes */}
        <div className="w-full bg-[#fdfbf7] rounded-b-2xl shadow-[inset_0_10px_20px_rgba(0,0,0,0.05)] flex flex-col md:flex-row relative z-10 pt-4 md:pt-6 pb-2 px-2 md:px-4">

          {/* Calendar Grid & Nav */}
          <div className="flex-1 md:border-r border-gray-200/60 relative pt-2">
            <CalendarWidget />
          </div>

          {/* Real physical notes section */}
          <div className="w-full md:w-[35%] min-w-[280px]">
            <NotesSection />
          </div>

        </div>

      </div>
    </div>
  );
}
