// EntryForm.jsx
// Reusable form component for editing Education and Experience entries.
// Receives a `fields` config array to dynamically render inputs/textareas.

import '../styles/form.css';

export default function EntryForm({ data, fields, onChange, onSave, onCancel }) {
  return (
    <div>
      {fields.map(f => (
        <div key={f.key ?? f.row?.[0]?.key} className={f.row ? undefined : 'form-group'}>
          {f.row ? (
            // Two-column row (e.g. Start Date / End Date)
            <div className="form-row">
              {f.row.map(rf => (
                <div key={rf.key} className="form-group">
                  <label>{rf.label}</label>
                  <input
                    placeholder={rf.placeholder || ''}
                    value={data[rf.key] || ''}
                    onChange={e => onChange({ ...data, [rf.key]: e.target.value })}
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
              <label>{f.label}</label>
              {f.textarea ? (
                <textarea
                  placeholder={f.placeholder || ''}
                  value={data[f.key] || ''}
                  onChange={e => onChange({ ...data, [f.key]: e.target.value })}
                />
              ) : (
                <input
                  placeholder={f.placeholder || ''}
                  value={data[f.key] || ''}
                  onChange={e => onChange({ ...data, [f.key]: e.target.value })}
                />
              )}
            </>
          )}
        </div>
      ))}

      <div className="btn-group">
        <button className="btn btn-primary" onClick={onSave}>Save</button>
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
