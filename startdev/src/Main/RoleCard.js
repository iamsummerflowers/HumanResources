import React from 'react';
import './RoleCard.css';
import TagInput from './TagInput.js';


function RoleCard({ role, updateRole, removeRole, defaultSkill }) {

  const updateSkill = (skillId, updates) => {

    const newSkills = role.skills.map(s => s.id === skillId ? { ...s, ...updates } : s);
    updateRole(role.id, { skills: newSkills });
    };

    const addSkill = () => {
      updateRole(role.id, { skills: [...role.skills, defaultSkill()] });
    };

    const removeSkill = (skillId) => {
      updateRole(role.id, { skills: role.skills.filter(s => s.id !== skillId) });
    };
  
  return (
    <div className="rounded-2xl bg-white/90 backdrop-blur border border-white/20 shadow-soft p-5 space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-slate-700">Role name</label>
          <input
            type="text"
            value={role.name}
            onChange={(e) => updateRole(role.id, { name: e.target.value })}
            placeholder="e.g., Frontend Engineer, Project Manager"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>
        <div className="w-36">
          <label className="text-sm font-medium text-slate-700">Team members</label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white w-9 h-9 flex items-center justify-center hover:bg-slate-50"
              onClick={() => updateRole(role.id, { membersNeeded: Math.max(1, role.membersNeeded - 1) })}
            >−</button>
            <input
              type="number"
              min="1"
              value={role.membersNeeded}
              onChange={e => updateRole(role.id, { membersNeeded: Math.max(1, Number(e.target.value) || 1) })}
              className="w-14 text-center rounded-lg border border-slate-200 bg-white px-2 py-2 outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white w-9 h-9 flex items-center justify-center hover:bg-slate-50"
              onClick={() => updateRole(role.id, { membersNeeded: role.membersNeeded + 1 })}
            >+</button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-800 font-semibold">
          <span className="text-indigo-600">🧩</span>
          <span>Required skills & proficiency</span>
        </div>
        <div className="space-y-2">
          {role.skills.map((skill) => (
            <div key={skill.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center">
              <div className="sm:col-span-6">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                  placeholder="Skill (e.g., React, Data Modeling)"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div className="sm:col-span-4">
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, { level: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/40"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="w-full justify-center inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 px-3 py-2 hover:bg-rose-100 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9 3h6a1 1 0 0 1 1 1v2h3a1 1 0 1 1 0 2h-1v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8H5a1 1 0 1 1 0-2h3V4a1 1 0 0 1 1-1Zm1 3h4V5h-4v1Zm-1 4a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0v-8Zm6 0a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0v-8Z"/></svg>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addSkill}
          className="w-fit inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-3 py-2 text-sm hover:bg-indigo-700 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5a1 1 0 1 1 2 0v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6Z"/></svg>
          Add skill
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">Required certifications or qualifications</label>
        <TagInput
          field="certifications"
          placeholder="Type and press Enter (e.g., PMP, AWS SA Pro)"
          color="emerald"
          help="Only list certifications that are truly required for the role."
          role={role}
          updateRole={updateRole}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">Prior experience (beneficial)</label>
        <TagInput
          field="experience"
          placeholder="Type and press Enter (e.g., FinTech, Healthcare, Startups)"
          color="amber"
          help="Optional but useful background that helps this role succeed."
          role={role}
          updateRole={updateRole}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-800 font-semibold">
          <span className="text-indigo-600">🗓️</span>
          <span>Availability</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-2">
          {[
            { value: 'Full-time', label: 'Full-time (40 hrs/week)' },
            { value: 'Part-time', label: 'Part-time (set hours/week)' },
            { value: 'Specific', label: 'Specific hours (describe)' },
          ].map(opt => (
            <label key={opt.value} className={`flex items-center gap-2 rounded-xl border ${role.availabilityType === opt.value ? 'border-indigo-500 bg-indigo-50/70' : 'border-slate-200 bg-white'} px-3 py-2 cursor-pointer transition`}>
              <input
                type="radio"
                name={`availability-${role.id}`}
                checked={role.availabilityType === opt.value}
                onChange={() => updateRole(role.id, { availabilityType: opt.value })}
              />
              <span className="text-sm text-slate-800">{opt.label}</span>
            </label>
          ))}
        </div>
        {role.availabilityType === 'Part-time' && (
          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-700">Hours per week</label>
            <input
              type="number"
              min="1"
              max="39"
              value={role.hoursPerWeek}
              onChange={e => updateRole(role.id, { hoursPerWeek: Math.max(1, Math.min(39, Number(e.target.value) || 1)) })}
              className="w-28 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>
        )}
        {role.availabilityType === 'Specific' && (
          <div className="space-y-1">
            <label className="text-sm text-slate-700">Describe expected hours</label>
            <input
              type="text"
              value={role.specificHours}
              onChange={e => updateRole(role.id, { specificHours: e.target.value })}
              placeholder="e.g., Mon–Wed 10am–2pm ET, Thu 3–6pm"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>
        )}
      </div>

      <div className="pt-1">
        <button
          type="button"
          onClick={() => removeRole(role.id)}
          className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 px-3 py-2 text-sm hover:bg-rose-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9 3h6a1 1 0 0 1 1 1v2h3a1 1 0 1 1 0 2h-1v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8H5a1 1 0 1 1 0-2h3V4a1 1 0 0 1 1-1Zm1 3h4V5h-4v1Zm-1 4a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0v-8Zm6 0a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0v-8Z"/></svg>
          Remove role
        </button>
      </div>
    </div>
  );
}

export default RoleCard;