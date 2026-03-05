// GeneralSection.jsx
// Sidebar panel for editing personal information (name, title, email, phone, location).

import EntryForm from './EntryForm';
import '../styles/sidebar.css';

const FIELDS = [
  { key: 'name',     label: 'Full Name',          placeholder: 'Jane Smith' },
  { key: 'title',    label: 'Professional Title',  placeholder: 'Senior Designer' },
  { row: [
    { key: 'email', label: 'Email', placeholder: 'jane@example.com' },
    { key: 'phone', label: 'Phone', placeholder: '+1 (555) 000-0000' },
  ]},
  { key: 'location', label: 'Location', placeholder: 'New York, NY' },
];

export default function GeneralSection({ general, isEditing, draft, onDraftChange, onSave, onEdit, onCancel }) {
  return (
    <div className="sidebar-section">
      <div className="section-title">Personal Information</div>

      {isEditing ? (
        <EntryForm
          data={draft}
          onChange={onDraftChange}
          onSave={onSave}
          onCancel={onCancel}
          fields={FIELDS}
        />
      ) : (
        <div className="entry-card">
          <div className="entry-card-header">
            <div>
              <div className="entry-card-title">{general.name || '—'}</div>
              <div className="entry-card-sub">{general.email}</div>
            </div>
            <button className="entry-toggle" onClick={onEdit}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
}
