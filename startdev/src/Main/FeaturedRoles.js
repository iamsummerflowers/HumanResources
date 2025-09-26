import React from 'react';
import './FeaturedRoles.css';
import RoleCard from './RoleCard.js';
import { uid } from '../utils/utils.js';



function FeaturedRoles({ roles, setRoles }) {

  const defaultSkill = () => ({
    id: uid(),
    name: '',
    level: 'Intermediate',
  });

  const defaultRole = () => ({
    id: uid(),
    name: '',
    membersNeeded: 1,
    availabilityType: 'Full-time',
    hoursPerWeek: 40,
    specificHours: '',
    skills: [defaultSkill()],
    certifications: [],
    experience: [],
  });

  const addRole = () => setRoles([...roles, defaultRole()]);
  
  const updateRole = (id, updates) => {
    setRoles(roles.map(role => role.id === id ? { ...role, ...updates } : role));
  };

  const removeRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  // const uid = () => 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  // const STORAGE_KEY = 'hrPlannerState.v1';
  
  return (
    <div className="space-y-5">
      {roles.map((role) => (
        <RoleCard 
          key={role.id} 
          role={role} 
          updateRole={updateRole}
          removeRole={removeRole}
          defaultSkill={defaultSkill}
        />
      ))}
      <div className="flex">
        <button
          type="button"
          onClick={addRole}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-4 py-2.5 text-sm hover:bg-indigo-700 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5a1 1 0 1 1 2 0v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6Z"/></svg>
          Add another role
        </button>
      </div>
    </div>
  );
}

export default FeaturedRoles;