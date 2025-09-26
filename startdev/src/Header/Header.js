import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header({ onExport, onClear }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div className="space-y-1">
        <h1 className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight">Project HR Needs Planner</h1>
        <p className="text-indigo-100 text-sm">Define roles, skills, proficiency, certifications, experience, and availability—then export your plan.</p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 text-white px-4 py-2.5 text-sm hover:bg-white/20 transition"
          title="Export"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a1 1 0 0 1 1 1v9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4.004 4.004a1.25 1.25 0 0 1-1.768 0L6.93 12.707a1 1 0 0 1 1.414-1.414L10 13.586V4a1 1 0 0 1 1-1Zm-8 14a2 2 0 0 1 2-2h2a1 1 0 1 1 0 2H6v2h12v-2h-2a1 1 0 1 1 0-2h2a2 2 0 0 1 2 2v2a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-2Z"/></svg>
          Export
        </button>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 rounded-xl bg-rose-600 text-white px-4 py-2.5 text-sm hover:bg-rose-700 transition"
          title="Clear all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5 7h14a1 1 0 1 0 0-2h-4.382a2 2 0 0 1-1.894-1.316l-.448-1.194A2 2 0 0 0 10.382 1H9.618a2 2 0 0 0-1.894 1.316l-.448 1.368A2 2 0 0 1 5.382 5H5a1 1 0 1 0 0 2Zm1 2h12v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9Z"/></svg>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Header;