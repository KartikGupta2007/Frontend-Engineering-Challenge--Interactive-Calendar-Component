// Sample aesthetic images from Unsplash optimized for backgrounds
const THEMES = {
  spring: {
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1200",
    color: "pink",
    badgeStyle: "bg-white/20 border-white/40 text-white"
  },
  summer: {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
    color: "sky",
    badgeStyle: "bg-white/20 border-white/40 text-white"
  },
  autumn: {
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=1200",
    color: "orange",
    badgeStyle: "bg-white/20 border-white/40 text-white"
  },
  winter: {
    image: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&q=80&w=1200",
    color: "blue",
    badgeStyle: "bg-slate-900/70 border-slate-300/30 text-slate-100"
  }
};

/**
 * Returns the visually appealing theme configuration depending on the provided month date.
 */
export function getThemeForMonth(date) {
  const month = date.getMonth(); // 0 is January, 11 is December
  
  if (month >= 2 && month <= 4) return { season: 'spring', ...THEMES.spring }; // Mar - May
  if (month >= 5 && month <= 7) return { season: 'summer', ...THEMES.summer }; // Jun - Aug
  if (month >= 8 && month <= 10) return { season: 'autumn', ...THEMES.autumn }; // Sep - Nov
  
  return { season: 'winter', ...THEMES.winter }; // Dec - Feb
}
