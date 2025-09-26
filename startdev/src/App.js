import React from 'react';
import logo from './assets/logoBrain.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header/Header.js';
import Hero from './Main/Hero.js';
import FeaturedRoles from './Main/FeaturedRoles.js';
import Summary from './Main/Summary.js';

import { uid } from './utils/utils.js';

import Footer from './Footer/Footer.js';


function App() {

  const STORAGE_KEY = 'hrPlannerState.v1';

  const [projectName, setProjectName] = useState('');
  const [crossSkills, setCrossSkills] = useState([]);
  const [roles, setRoles] = useState([{
    id: uid(),
    name: '',
    membersNeeded: 1,
    availabilityType: 'Full-time',
    hoursPerWeek: 40,
    specificHours: '',
    skills: [{ id: uid(), name: '', level: 'Intermediate' }],
    certifications: [],
    experience: [],
  }]);
  const [exportOpen, setExportOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.roles?.length) {
          setProjectName(parsed.projectName || '');
          setCrossSkills(parsed.crossSkills || []);
          setRoles(parsed.roles.map(r => ({
            ...r,
            id: r.id || uid(),
            skills: (r.skills || []).map(s => ({ ...s, id: s.id || uid() }))
          })));
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Autosave
  useEffect(() => {
    const data = { projectName, crossSkills, roles };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [projectName, crossSkills, roles]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const clearAll = () => {
    setProjectName('');
    setCrossSkills([]);
    setRoles([{
      id: uid(),
      name: '',
      membersNeeded: 1,
      availabilityType: 'Full-time',
      hoursPerWeek: 40,
      specificHours: '',
      skills: [{ id: uid(), name: '', level: 'Intermediate' }],
      certifications: [],
      experience: [],
    }]);
    showToast('Cleared. A fresh planner is ready.');
  };


  return (
    <div className="py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header 
          onExport={() => setExportOpen(o => !o)} 
          onClear={clearAll} 
        />
        
        <Hero 
          projectName={projectName}
          setProjectName={setProjectName}
          crossSkills={crossSkills}
          setCrossSkills={setCrossSkills}
        />

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <FeaturedRoles roles={roles} setRoles={setRoles} />
          </div>
          
          <div className="lg:col-span-4">
            <Summary 
              projectName={projectName}
              crossSkills={crossSkills}
              roles={roles}
              exportOpen={exportOpen}
              setExportOpen={setExportOpen}
              showToast={showToast}
            />
          </div>
        </div>

        {/* {toast && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
            <div className="rounded-xl bg-slate-900 text-white/95 px-4 py-2 shadow-soft text-sm">
              {toast}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default App;
