// CVPreview.jsx
// Right-side live preview of the generated CV.
// Receives general, educations, and experiences as props and renders the styled document.

import '../styles/preview.css';

export default function CVPreview({ general, educations, experiences }) {
  const hasContent =
    general.name ||
    educations.some(e => e.school) ||
    experiences.some(e => e.company);

  return (
    <main className="preview">
      <div className="preview-header">
        <span className="preview-label">Live Preview</span>
      </div>

      <div className="cv-paper">
        {!hasContent ? (
          <div className="cv-empty">
            <div className="cv-empty-icon">✦</div>
            <div className="cv-empty-text">Your résumé will appear here</div>
          </div>
        ) : (
          <>
            {/* ── Header ── */}
            <div className="cv-header">
              {general.name  && <h1 className="cv-name">{general.name}</h1>}
              {general.title && <div className="cv-title-line">{general.title}</div>}
              <div className="cv-contact">
                {general.email    && <span>✉ {general.email}</span>}
                {general.phone    && <span>✆ {general.phone}</span>}
                {general.location && <span>⌖ {general.location}</span>}
              </div>
            </div>

            <div className="cv-divider" />

            {/* ── Education ── */}
            {educations.filter(e => e.school).length > 0 && (
              <div className="cv-section">
                <div className="cv-section-label">Education</div>
                {educations.filter(e => e.school).map(edu => (
                  <div key={edu.id} className="cv-entry">
                    <div className="cv-entry-header">
                      <div className="cv-entry-title">{edu.school}</div>
                      <div className="cv-entry-date">
                        {edu.startDate}
                        {edu.startDate && edu.endDate && ' – '}
                        {edu.endDate}
                      </div>
                    </div>
                    {(edu.degree || edu.field) && (
                      <div className="cv-entry-sub">
                        {edu.degree}
                        {edu.degree && edu.field && ', '}
                        {edu.field}
                      </div>
                    )}
                    {edu.gpa && <div className="cv-entry-detail">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* ── Experience ── */}
            {experiences.filter(e => e.company).length > 0 && (
              <div className="cv-section">
                <div className="cv-section-label">Experience</div>
                {experiences.filter(e => e.company).map(exp => (
                  <div key={exp.id} className="cv-entry">
                    <div className="cv-entry-header">
                      <div className="cv-entry-title">{exp.company}</div>
                      <div className="cv-entry-date">
                        {exp.startDate}
                        {exp.startDate && exp.endDate && ' – '}
                        {exp.endDate}
                      </div>
                    </div>
                    {exp.position && (
                      <div className="cv-entry-sub">
                        {exp.position}
                        {exp.location && ` · ${exp.location}`}
                      </div>
                    )}
                    {exp.responsibilities && (
                      <div className="cv-entry-detail">{exp.responsibilities}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
