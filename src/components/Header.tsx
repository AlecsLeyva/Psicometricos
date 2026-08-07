import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | 'test' | 'results';
  onNavigate: (tab: 'home' | 'test' | 'results') => void;
  hasAnswers: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate, hasAnswers }) => {
  return (
    <header className="main-header">
      <div className="app-container header-content">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="brand-logo">
          <div className="logo-icon">
            <Compass size={24} />
          </div>
          <div>
            Psico<span>Metrix</span>
          </div>
        </a>

        <nav className="nav-links">
          <button
            onClick={() => onNavigate('home')}
            className={`nav-link ${currentTab === 'home' ? 'active' : ''}`}
          >
            Inicio
          </button>
          <button
            onClick={() => onNavigate('test')}
            className={`nav-link ${currentTab === 'test' ? 'active' : ''}`}
          >
            Evaluación (5 Preguntas)
          </button>
          {hasAnswers && (
            <button
              onClick={() => onNavigate('results')}
              className={`nav-link ${currentTab === 'results' ? 'active' : ''}`}
            >
              Mi Gráfica
            </button>
          )}

          <button onClick={() => onNavigate('test')} className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
            <Sparkles size={16} /> Iniciar Evaluación
          </button>
        </nav>
      </div>
    </header>
  );
};
