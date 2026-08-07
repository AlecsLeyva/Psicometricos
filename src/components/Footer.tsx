import React from 'react';
import { Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ borderTop: '1px solid rgba(226, 232, 240, 0.8)', padding: '2.5rem 0', background: 'rgba(255, 255, 255, 0.9)' }}>
      <div className="app-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="logo-icon" style={{ width: '32px', height: '32px' }}>
            <Compass size={18} />
          </div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a' }}>PsicoMetrix</span>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Plataforma de Evaluaciones Psicométricas & Competencias Laborales.
        </p>

        <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} Motor de Evaluación PsicoMetrix
        </span>
      </div>
    </footer>
  );
};
