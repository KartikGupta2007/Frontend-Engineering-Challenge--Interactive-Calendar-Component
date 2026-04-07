# 📅 Interactive Wall Calendar - Frontend Challenge

A premium, highly interactive calendar component built with **React**, **Vite**, and **Framer Motion**. This project features a unique 3D "Spiral Binding" design, dynamic month-based themes, and a Vanta.js-powered animated background for a truly immersive user experience.

![Calendar UI Preview](https://github.com/user-attachments/assets/...)

## ✨ Key Features

- **3D Spiral Binding Layout**: A unique visual design that mimics a physical wall calendar with depth and realistic shadows.
- **Dynamic Seasonal Themes**: Backgrounds and UI accents change automatically based on the month (Winter Snow, Spring Blooms, Summer Sunsets, etc.).
- **Smart Date Selection**: Drag-to-select multiple days with automatic range normalization and responsive hover states.
- **Persistent Notes**: Integrated notepad for each month with local storage persistence to keep your notes saved between sessions.
- **Performance Optimized**: 
  - Split Context architecture (State/Dispatch) to minimize re-renders.
  - Memoized grid cells for smooth interaction even with 42+ active cells.
  - Optimized Vanta.js background with proper layer management.
- **Production-Ready**: 
  - Global Error Boundary for runtime resilience.
  - Vercel-optimized configuration.
  - Mobile-first responsive design.

## 🚀 Tech Stack

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Visuals**: Vanta.js (Net) + Three.js
- **Date Handling**: date-fns
- **Icons**: Lucide React

## 🛠️ Architecture

- **Context API**: Uses a split-context pattern where state and dispatch are provided separately. This ensures that components only needing `dispatch` (like `DayCell`) don't re-render when the global `selection` state changes.
- **Reducer Pattern**: Centralized state management for navigation, selection range, and notes.
- **Custom Hooks**: 
  - `useCalendarGrid`: Generates the 6-week display grid for any given month.
  - `useCalendarState`: Access to current view, selection, and notes.
  - `useCalendarDispatch`: Access to state update actions.

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm / yarn

### Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

This project is optimized for **Vercel**. 
- Single Page Application (SPA) routing is handled via `vercel.json`.
- Asset caching is pre-configured for better performance.

---

### Author
**Kartik Gupta**
- [GitHub](https://github.com/KartikGupta2007)
- [LinkedIn](https://www.linkedin.com/in/...)
