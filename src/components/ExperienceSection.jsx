// ExperienceSection.jsx
// Sidebar panel for managing one or more work experience entries.

import EntryForm from './EntryForm';
import '../styles/sidebar.css';

const FIELDS = [
  { key: 'company',          label: 'Company',        placeholder: 'Acme Corp' },
  { key: 'position',         label: 'Position Title', placeholder: 'Lead Engineer' },
  { key: 'location',         label: 'Location',       placeholder: 'San Francisco, CA' },
  { row: [
    { key: 'startDate', label: 'Start', placeholder: 'Jan 2022' },
    { key: 'endDate',   label: 'End',   placeholder: 'Present' },
  ]},
  {
    key: 'responsibilities',
    label: 'Responsibilities',
    placeholder: 'Describe your key achievements and duties...',
    textarea: true,
  },
];

export default function ExperienceSection({
  experiences, drafts, editing,
  onDraftChange, onSave, onEdit, onCancel, onDelete, onAdd,
}) {
  return (
    <div className="sidebar-section">
      <div className="section-title">Work Experience</div>

      {experiences.map(exp => (
        <div key={exp.id} className="entry-card">
          {editing[exp.id] ? (
            <EntryForm
              data={drafts[exp.id] || exp}
              onChange={d => onDraftChange(exp.id, d)}
              onSave={() => onSave(exp.id)}
              onCancel={() => onCancel(exp.id)}
              fields={FIELDS}
            />
          ) : (
            <div className="entry-card-header">
              <div>
                <div className="entry-card-title">{exp.company || 'Untitled'}</div>
                <div className="entry-card-sub">{exp.position}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="entry-toggle" onClick={() => onEdit(exp.id)}>Edit</button>
                <button
                  className="entry-toggle"
                  style={{ color: '#8a4030' }}
                  onClick={() => onDelete(exp.id)}
                >✕</button>
              </div>
            </div>
          )}
        </div>
      ))}

      <button className="btn-add" onClick={onAdd}>+ Add Experience</button>
    </div>
  );
}
