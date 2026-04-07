import { useCalendarContext } from '../../context/CalendarContext';
import { getThemeForMonth } from '../../utils/themeUtils';
import { format } from 'date-fns';

export function HeroSection() {
  const { state } = useCalendarContext();
  const theme = getThemeForMonth(state.currentViewContext);

  return (
    <div 
      className="relative w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out" 
      style={{ backgroundImage: `url(${theme.image})` }}
    >
      <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/30 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 shadow-[inset_0_8px_20px_rgba(0,0,0,0.2)] pointer-events-none"></div>
      
      <div className="absolute bottom-8 left-8 text-white drop-shadow-xl z-20">
        <h2 className="text-5xl sm:text-7xl font-black tracking-tighter shadow-black/50">
          {format(state.currentViewContext, 'MMMM')}
        </h2>
        <p className="text-xl sm:text-2xl font-bold text-white mt-1 uppercase tracking-[0.25em] opacity-90 drop-shadow-md">
          {format(state.currentViewContext, 'yyyy')}
        </p>
      </div>

      <div className={`absolute top-6 right-6 backdrop-blur-xl px-4 py-1.5 rounded-full border text-xs uppercase tracking-widest font-bold shadow-lg z-20 ${theme.badgeStyle}`}>
        {theme.season}
      </div> 
    </div>
  );
}
