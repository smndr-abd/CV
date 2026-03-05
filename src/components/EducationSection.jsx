// EducationSection.jsx
// Sidebar panel for managing one or more education entries.

import EntryForm from './EntryForm';
import '../styles/sidebar.css';

const FIELDS = [
  { key: 'school', label: 'School / University', placeholder: 'MIT' },
  { key: 'degree', label: 'Degree',              placeholder: 'Bachelor of Science' },
  { key: 'field',  label: 'Field of Study',       placeholder: 'Computer Science' },
  { row: [
    { key: 'startDate', label: 'Start', placeholder: 'Sep 2018' },
    { key: 'endDate',   label: 'End',   placeholder: 'May 2022' },
  ]},
  { key: 'gpa', label: 'GPA (optional)', placeholder: '3.8 / 4.0' },
];

export default function EducationSection({
  educations, drafts, editing,
  onDraftChange, onSave, onEdit, onCancel, onDelete, onAdd,
}) {
  return (
    <div className="sidebar-section">
      <div className="section-title">Education</div>

      {educations.map(edu => (
        <div key={edu.id} className="entry-card">
          {editing[edu.id] ? (
            <EntryForm
              data={drafts[edu.id] || edu}
              onChange={d => onDraftChange(edu.id, d)}
              onSave={() => onSave(edu.id)}
              onCancel={() => onCancel(edu.id)}
              fields={FIELDS}
            />
          ) : (
            <div className="entry-card-header">
              <div>
                <div className="entry-card-title">{edu.school || 'Untitled'}</div>
                <div className="entry-card-sub">
                  {edu.degree}{edu.field && ` · ${edu.field}`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="entry-toggle" onClick={() => onEdit(edu.id)}>Edit</button>
                <button
                  className="entry-toggle"
                  style={{ color: '#8a4030' }}
                  onClick={() => onDelete(edu.id)}
                >✕</button>
              </div>
            </div>
          )}
        </div>
      ))}

      <button className="btn-add" onClick={onAdd}>+ Add Education</button>
    </div>
  );
}
