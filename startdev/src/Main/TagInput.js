import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './TagInput.css';

function TagInput({ field, placeholder, color, help, role, updateRole }) {

    const [input, setInput] = useState('');
      
    const addTag = (value) => {
      if (!value.trim() || role[field].includes(value.trim())) return;
      updateRole(role.id, { [field]: [...role[field], value.trim()] });
    };

    const removeTag = (index) => {
      updateRole(role.id, { [field]: role[field].filter((_, i) => i !== index) });
    };
      
    const handleAdd = () => {
      addTag(input);
      setInput('');
    };

    const onKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAdd();
      } else if (e.key === 'Backspace' && !input && role[field].length) {
        e.preventDefault();
        removeTag(role[field].length - 1);
      }
    };
  
  return (
    <div className="space-y-1.5">
      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500/40">
        <div className="flex flex-wrap items-center gap-2">
          {role[field].map((item, i) => (
            <span key={item + i} className={`inline-flex items-center gap-1.5 rounded-full bg-${color}-100 text-${color}-800 px-2.5 py-1 text-xs font-medium`}>
              {item}
              <button
                type="button"
                className={`hover:text-${color}-900 transition`}
                onClick={() => removeTag(i)}
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
            placeholder={placeholder}
            className="flex-1 min-w-[140px] outline-none text-slate-800 placeholder:text-slate-400 bg-transparent py-1"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="w-fit text-xs px-2.5 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>
      </div>
      {help && <p className="text-xs text-slate-500">{help}</p>}
    </div>
  );
}

export default TagInput;