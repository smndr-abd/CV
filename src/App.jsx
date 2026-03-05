// App.jsx
// Root component. Owns all state and wires together the sidebar sections and the live preview.

import { useState } from 'react';

import GeneralSection   from './components/GeneralSection';
import EducationSection from './components/EducationSection';
import ExperienceSection from './components/ExperienceSection';
import CVPreview        from './components/CVPreview';

import './styles/global.css';
import './styles/layout.css';
import './styles/sidebar.css';

// ── Default shapes ──────────────────────────────────────────────────────────
const DEFAULT_GENERAL = { name: '', email: '', phone: '', title: '', location: '' };
const DEFAULT_EDU     = { school: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' };
const DEFAULT_EXP     = { company: '', position: '', responsibilities: '', startDate: '', endDate: '', location: '' };

// ── Helpers ─────────────────────────────────────────────────────────────────
// Returns a simple incrementing id via closure (not React state, so it never re-renders).
let _nextId = 1;
const newId = () => _nextId++;

export default function App() {

  // ── General ─────────────────────────────────────────────────────────────
  const [general,     setGeneral]     = useState({ ...DEFAULT_GENERAL });
  const [generalEdit, setGeneralEdit] = useState(true);           // open by default
  const [generalDraft,setGeneralDraft]= useState({ ...DEFAULT_GENERAL });

  const handleGeneralSave   = () => { setGeneral({ ...generalDraft }); setGeneralEdit(false); };
  const handleGeneralEdit   = () => { setGeneralDraft({ ...general }); setGeneralEdit(true);  };
  const handleGeneralCancel = () => setGeneralEdit(false);

  // ── Education ────────────────────────────────────────────────────────────
  const [educations, setEducations] = useState([]);
  const [eduDrafts,  setEduDrafts]  = useState({});   // { [id]: draft }
  const [eduEditing, setEduEditing] = useState({});   // { [id]: bool  }

  const addEdu = () => {
    const id    = newId();
    const blank = { ...DEFAULT_EDU, id };
    setEducations(prev => [...prev, blank]);
    setEduDrafts( prev => ({ ...prev, [id]: { ...blank } }));
    setEduEditing(prev => ({ ...prev, [id]: true }));
  };

  const saveEdu = (id) => {
    setEducations(prev => prev.map(e => e.id === id ? { ...eduDrafts[id] } : e));
    setEduEditing(prev => ({ ...prev, [id]: false }));
  };

  const editEdu = (id) => {
    setEduDrafts( prev => ({ ...prev, [id]: { ...educations.find(e => e.id === id) } }));
    setEduEditing(prev => ({ ...prev, [id]: true }));
  };

  const cancelEdu = (id) => {
    // If the entry was never saved (no school name), remove it
    if (!educations.find(e => e.id === id)?.school) {
      setEducations(prev => prev.filter(e => e.id !== id));
    }
    setEduEditing(prev => ({ ...prev, [id]: false }));
  };

  const deleteEdu = (id) => setEducations(prev => prev.filter(e => e.id !== id));

  const changeEduDraft = (id, data) =>
    setEduDrafts(prev => ({ ...prev, [id]: data }));

  // ── Experience ───────────────────────────────────────────────────────────
  const [experiences, setExperiences] = useState([]);
  const [expDrafts,   setExpDrafts]   = useState({});
  const [expEditing,  setExpEditing]  = useState({});

  const addExp = () => {
    const id    = newId();
    const blank = { ...DEFAULT_EXP, id };
    setExperiences(prev => [...prev, blank]);
    setExpDrafts(  prev => ({ ...prev, [id]: { ...blank } }));
    setExpEditing( prev => ({ ...prev, [id]: true }));
  };

  const saveExp = (id) => {
    setExperiences(prev => prev.map(e => e.id === id ? { ...expDrafts[id] } : e));
    setExpEditing( prev => ({ ...prev, [id]: false }));
  };

  const editExp = (id) => {
    setExpDrafts( prev => ({ ...prev, [id]: { ...experiences.find(e => e.id === id) } }));
    setExpEditing(prev => ({ ...prev, [id]: true }));
  };

  const cancelExp = (id) => {
    if (!experiences.find(e => e.id === id)?.company) {
      setExperiences(prev => prev.filter(e => e.id !== id));
    }
    setExpEditing(prev => ({ ...prev, [id]: false }));
  };

  const deleteExp = (id) => setExperiences(prev => prev.filter(e => e.id !== id));

  const changeExpDraft = (id, data) =>
    setExpDrafts(prev => ({ ...prev, [id]: data }));

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="app">

      {/* ── Left sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">CV Builder</div>

        <GeneralSection
          general={general}
          isEditing={generalEdit}
          draft={generalDraft}
          onDraftChange={setGeneralDraft}
          onSave={handleGeneralSave}
          onEdit={handleGeneralEdit}
          onCancel={handleGeneralCancel}
        />

        <EducationSection
          educations={educations}
          drafts={eduDrafts}
          editing={eduEditing}
          onDraftChange={changeEduDraft}
          onSave={saveEdu}
          onEdit={editEdu}
          onCancel={cancelEdu}
          onDelete={deleteEdu}
          onAdd={addEdu}
        />

        <ExperienceSection
          experiences={experiences}
          drafts={expDrafts}
          editing={expEditing}
          onDraftChange={changeExpDraft}
          onSave={saveExp}
          onEdit={editExp}
          onCancel={cancelExp}
          onDelete={deleteExp}
          onAdd={addExp}
        />
      </aside>

      {/* ── Right preview ── */}
      <CVPreview
        general={general}
        educations={educations}
        experiences={experiences}
      />
    </div>
  );
}
