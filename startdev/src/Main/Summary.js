import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import './Summary.css';

function Summary({ projectName, crossSkills, roles, exportOpen, setExportOpen, showToast }) {

  const totals = useMemo(() => {
      const headcount = roles.reduce((sum, r) => sum + (r.membersNeeded || 0), 0);
      const weeklyHours = roles.reduce((sum, r) => {
        if (r.availabilityType === 'Full-time') return sum + (r.membersNeeded * 40);
        if (r.availabilityType === 'Part-time') return sum + (r.membersNeeded * (r.hoursPerWeek || 0));
        return sum;
      }, 0);
      return { headcount, weeklyHours };
    }, [roles]);

    const consolidated = useMemo(() => {
      return roles.map(r => ({
        role: r.name || 'Unnamed role',
        members: r.membersNeeded,
        availability: r.availabilityType === 'Full-time'
          ? 'Full-time'
          : r.availabilityType === 'Part-time'
            ? `${r.hoursPerWeek || 0} hrs/wk`
            : r.specificHours || 'Specific hours',
        skills: r.skills.filter(s => s.name.trim()).map(s => `${s.name.trim()} (${s.level})`),
        certifications: r.certifications,
        experience: r.experience,
      }));
    }, [roles]);

    const makeJSON = () => {
      const payload = {
        projectName: projectName || 'Untitled Project',
        crossFunctionalSkills: crossSkills,
        roles: roles.map(r => ({
          role: r.name || 'Unnamed role',
          membersNeeded: r.membersNeeded,
          availability: r.availabilityType === 'Full-time'
            ? { type: 'Full-time', hoursPerWeek: 40 }
            : r.availabilityType === 'Part-time'
              ? { type: 'Part-time', hoursPerWeek: r.hoursPerWeek || 0 }
              : { type: 'Specific', details: r.specificHours || '' },
          skills: r.skills.filter(s => s.name.trim()).map(s => ({ name: s.name.trim(), proficiency: s.level })),
          certifications: r.certifications,
          priorExperience: r.experience,
        })),
        generatedAt: new Date().toISOString(),
      };
      return JSON.stringify(payload, null, 2);
    };

    const copyJSON = async () => {
      try {
        await navigator.clipboard.writeText(makeJSON());
        showToast('JSON copied to clipboard');
      } catch (e) {
        showToast('Copy failed. You can still download.');
      }
    };

    const downloadJSON = () => {
      const blob = new Blob([makeJSON()], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safeName = (projectName || 'hr-needs').replace(/[^\w\-]+/g, '-').toLowerCase();
      a.download = `${safeName}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    };

    const downloadPDF = async () => {
      try {
        let jsPDFCtor = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
        if (!jsPDFCtor) {
          await new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            s.onload = resolve;
            s.onerror = () => reject(new Error('Failed to load PDF library'));
            document.head.appendChild(s);
          });
          jsPDFCtor = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
        }
        if (!jsPDFCtor) {
          throw new Error('PDF library unavailable');
        }

        const doc = new jsPDFCtor({ unit: 'pt', format: 'a4' });
        const margin = 40;
        const lineHeight = 18;
        let y = margin;
        const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;

        const safe = (v) => (v || '').toString();
        const writeLine = (text, options = {}) => {
          const { bold = false, color = '#111827', size = 11 } = options;
          doc.setTextColor(color);
          doc.setFont('helvetica', bold ? 'bold' : 'normal');
          doc.setFontSize(size);
          const lines = doc.splitTextToSize(text, maxWidth);
          lines.forEach((ln) => {
            if (y > doc.internal.pageSize.getHeight() - margin) {
              doc.addPage();
              y = margin;
            }
            doc.text(ln, margin, y);
            y += lineHeight;
          });
        };

        writeLine('Project HR Needs Planner', { bold: true, size: 16 });
        writeLine(safe(projectName) || 'Untitled Project', { color: '#4f46e5', bold: true, size: 14 });
        y += 6;

        if (crossSkills.length) {
          writeLine('Cross-functional skills', { bold: true, size: 12 });
          writeLine(crossSkills.join(', '), { size: 11, color: '#374151' });
          y += 6;
        }

        roles.forEach((r, idx) => {
          const roleName = r.name || `Role ${idx + 1}`;
          y += 6;
          writeLine(roleName, { bold: true, size: 12 });
          writeLine(`Members needed: ${r.membersNeeded || 1}`, { size: 11 });

          let avail = '';
          if (r.availabilityType === 'Full-time') avail = 'Full-time (40 hrs/wk)';
          else if (r.availabilityType === 'Part-time') avail = `Part-time (${r.hoursPerWeek || 0} hrs/wk)`;
          else avail = `Specific hours: ${safe(r.specificHours)}`;
          writeLine(`Availability: ${avail}`, { size: 11 });

          const skills = (r.skills || []).filter(s => safe(s.name).trim());
          if (skills.length) {
            writeLine('Skills & proficiency:', { bold: true, size: 11 });
            skills.forEach(s => writeLine(`• ${safe(s.name)} (${s.level || 'Intermediate'})`, { size: 11, color: '#374151' }));
          }

          if ((r.certifications || []).length) {
            writeLine('Required certifications:', { bold: true, size: 11 });
            r.certifications.forEach(c => writeLine(`• ${safe(c)}`, { size: 11, color: '#374151' }));
          }

          if ((r.experience || []).length) {
            writeLine('Beneficial prior experience:', { bold: true, size: 11 });
            r.experience.forEach(c => writeLine(`• ${safe(c)}`, { size: 11, color: '#374151' }));
          }
        });

        const filename = `${(projectName || 'hr-needs').replace(/[^\w\-]+/g, '-').toLowerCase()}.pdf`;

        try {
          doc.save(filename);
        } catch (saveErr) {
          const blob = doc.output('blob');
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.target = '_blank';
          a.rel = 'noopener';
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 10000);
        }

        showToast('PDF ready');
      } catch (e) {
        showToast('PDF export failed. Please try again.');
      }
    };
  
  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="sticky top-6">
        <div className="rounded-2xl bg-white/90 backdrop-blur border border-white/20 shadow-soft p-5 space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Summary</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-indigo-600/90 text-white p-4">
              <div className="text-xs opacity-90">Total headcount</div>
              <div className="text-2xl font-extrabold">{totals.headcount}</div>
            </div>
            <div className="rounded-xl bg-violet-600/90 text-white p-4">
              <div className="text-xs opacity-90">Planned weekly hours</div>
              <div className="text-2xl font-extrabold">{totals.weeklyHours}</div>
            </div>
            <div className="rounded-xl bg-cyan-600/90 text-white p-4">
              <div className="text-xs opacity-90">Roles</div>
              <div className="text-2xl font-extrabold">{roles.length}</div>
            </div>
          </div>

          {crossSkills.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center gap-2 text-slate-600 font-semibold">
                <span className="text-cyan-600">🤝</span>
                <span>Cross‑functional skills</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {crossSkills.map((s, i) => (
                  <span key={s + i} className="text-xs bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-full px-2.5 py-1">{s}</span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-600 font-semibold">
              <span className="w-fit text-indigo-600">📋</span>
              <span className="w-fit">By role</span>
            </div>
            <div className="space-y-3 max-h-[320px] overflow-auto pr-1">
              {consolidated.map((r, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-slate-800">{r.role}</div>
                    <span className="text-xs bg-slate-100 text-slate-700 rounded-full px-2 py-1">{r.members} needed</span>
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    Availability: <span className="font-medium text-slate-800">{r.availability}</span>
                  </div>
                  {r.skills.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-slate-500 mb-1">Skills & proficiency</div>
                      <div className="flex flex-wrap gap-2">
                        {r.skills.map((s, j) => (
                          <span key={j} className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-2.5 py-1">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {r.certifications.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-slate-500 mb-1">Required certifications</div>
                      <div className="flex flex-wrap gap-2">
                        {r.certifications.map((c, j) => (
                          <span key={j} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-1">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {r.experience.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-slate-500 mb-1">Beneficial prior experience</div>
                      <div className="flex flex-wrap gap-2">
                        {r.experience.map((c, j) => (
                          <span key={j} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-1">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {consolidated.length === 0 && (
                <div className="text-sm text-slate-500">Add a role to see a breakdown here.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Export Panel */}
      {exportOpen && (
        <div className="rounded-2xl bg-white/90 backdrop-blur border border-white/20 shadow-soft p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between space-x-2 gap-2 text-slate-800 font-semibold">
              <span className="w-fit text-indigo-600">🖨️</span>
              <span>Export your plan</span>
            </div>
            <button
              type="button"
              onClick={() => setExportOpen(false)}
              className="w-fit mx-3 text-slate-600 hover:text-slate-800"
            >
              ✕
            </button>
          </div>
          <div className="text-sm text-slate-600">Copy or download a structured JSON of your HR requirements.</div>
          <textarea
            readOnly
            value={makeJSON()}
            className="w-full h-64 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/40 font-mono text-xs"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyJSON}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-4 py-2.5 text-sm hover:bg-indigo-700 transition"
            >
              Copy JSON
            </button>
            <button
              type="button"
              onClick={downloadJSON}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white text-slate-800 px-4 py-2.5 text-sm hover:bg-slate-50 transition"
            >
              Download JSON
            </button>
            <button
              type="button"
              onClick={downloadPDF}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white text-slate-800 px-4 py-2.5 text-sm hover:bg-slate-50 transition"
            >
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;