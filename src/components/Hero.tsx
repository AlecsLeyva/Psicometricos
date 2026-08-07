import React from 'react';
import { ArrowRight, BarChart3, Target, Zap, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onStartTest: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartTest }) => {
  return (
    <section className="animate-fade-in" style={{ padding: '4rem 0 3rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 3.5rem' }}>
        <div
          className="glass-pill"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.25rem',
            marginBottom: '1.5rem',
            color: '#0284c7',
            fontSize: '0.9rem',
            fontWeight: 700
          }}
        >
          <Target size={16} /> Evaluación de Competencias y Perfil Psicométrico Profesional
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1.25rem',
            color: '#0f172a'
          }}
        >
          Evaluación Psicométrica de Competencias Laborales
        </h1>

        <p
          style={{
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            marginBottom: '2.25rem',
            lineHeight: 1.6
          }}
        >
          Mide tus capacidades clave en <strong>5 dimensiones estratégicas</strong>: Liderazgo, Pensamiento Analítico,
          Colaboración, Innovación y Resiliencia. Genera un gráfico de radar interactivo en tiempo real con sugerencias de roles.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={onStartTest} className="btn-primary" style={{ padding: '1rem 2.25rem', fontSize: '1.1rem' }}>
            Comenzar Evaluación (5 Preguntas) <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* 3 Step Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem',
          margin: '2rem 0'
        }}
      >
        <div
          className="glass-panel"
          style={{
            padding: '2.25rem',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <div
            style={{
              background: 'rgba(79, 70, 229, 0.1)',
              color: '#4f46e5',
              padding: '0.35rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}
          >
            FASE 1
          </div>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              marginBottom: '1.25rem',
              boxShadow: '0 8px 16px rgba(79, 70, 229, 0.25)'
            }}
          >
            <ShieldCheck size={28} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>Responde el Cuestionario</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem' }}>
            Evalúa tu estilo de respuesta ante 5 reactivos psicométricos clave que miden tus patrones de comportamiento operativo.
          </p>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: '2.25rem',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <div
            style={{
              background: 'rgba(5, 150, 105, 0.1)',
              color: '#059669',
              padding: '0.35rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}
          >
            FASE 2
          </div>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #059669, #10b981)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              marginBottom: '1.25rem',
              boxShadow: '0 8px 16px rgba(5, 150, 105, 0.25)'
            }}
          >
            <BarChart3 size={28} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>Mapa Psicométrico de Radar</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem' }}>
            Visualiza tu gráfico de radar en tiempo real con ponderaciones porcentuales objetivas de tus aptitudes profesionales.
          </p>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: '2.25rem',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <div
            style={{
              background: 'rgba(2, 132, 199, 0.1)',
              color: '#0284c7',
              padding: '0.35rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}
          >
            FASE 3
          </div>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              marginBottom: '1.25rem',
              boxShadow: '0 8px 16px rgba(2, 132, 199, 0.25)'
            }}
          >
            <Zap size={28} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>Roles & Diagnóstico</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem' }}>
            Obtén explicaciones interactivas de tus fortalezas, áreas de oportunidad y roles de trabajo idóneos.
          </p>
        </div>
      </div>
    </section>
  );
};
