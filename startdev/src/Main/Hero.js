import React from 'react';
import './Hero.css';
import { useState, useEffect, useRef } from 'react';

// import Card from './Card.js';
// import logo from '../assets/logoBrain.svg'


function Hero ({ projectName, setProjectName, crossSkills, setCrossSkills }) {
  
  const [input, setInput] = useState('');
      
  const addSkill = () => {
    const v = input.trim();
    if (!v || crossSkills.includes(v)) return;
    setCrossSkills([...crossSkills, v]);
    setInput('');
  };

  const removeSkill = (index) => {
    setCrossSkills(crossSkills.filter((_, i) => i !== index));
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    } else if (e.key === 'Backspace' && !input && crossSkills.length) {
      e.preventDefault();
      const copy = [...crossSkills];
      copy.pop();
      setCrossSkills(copy);
    }
  };

  return (
      <div className="rounded-2xl bg-white/90 backdrop-blur border border-white/20 shadow-soft p-5 mb-6">
        <div className="grid md:grid-cols-3 gap-4">

          <div className="md:col-span-1">
            <label className="text-sm font-medium text-slate-700">Project name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., Q4 Website Revamp"
              className="w-full mt-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Cross‑functional skills for collaboration</label>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500/40 mt-1">
              <div className="flex flex-wrap items-center gap-2">

                {crossSkills.map((skill, i) => (
                  <span key={skill + i} className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 text-cyan-800 px-2.5 py-1 text-xs font-medium">
                    {skill}
                    <button
                      type="button"
                      className="hover:text-cyan-900 transition"
                      onClick={() => removeSkill(i)}
                      title="Remove"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                ))}

                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type and press Enter (e.g., Agile, Communication)"
                  className="flex-1 min-w-[140px] outline-none text-slate-800 placeholder:text-slate-400 bg-transparent py-1"
                />

                <button
                  type="button"
                  onClick={addSkill}
                  className=" w-fit text-s px-2.5 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Add
                </button>
                
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1">Skills helpful across the whole team for smooth collaboration.</p>
          </div>
        </div>
      </div>
  );
}

export default Hero;