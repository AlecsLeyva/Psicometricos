import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { calculateScores, determineProfile } from '../data/profiles';
import type { AnswerState, RoleInfo } from '../types/psychometrics';
import {
  AlertTriangle,
  Award,
  Briefcase,
  CheckCircle2,
  Info,
  RefreshCw,
  Sparkles,
  X,
  XCircle
} from 'lucide-react';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ResultsViewProps {
  answers: AnswerState;
  onReset: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ answers, onReset }) => {
  const scores = calculateScores(answers);
  const profile = determineProfile(scores);
  const [selectedRole, setSelectedRole] = useState<RoleInfo | null>(null);

  useEffect(() => {
    if (!profile.isLowScoreProfile) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [profile.isLowScoreProfile]);

  // Datos del gráfico radar Chart.js para modo claro
  const chartData = {
    labels: scores.map((s) => s.name),
    datasets: [
      {
        label: 'Competencia Psicométrica (%)',
        data: scores.map((s) => s.score),
        backgroundColor: profile.isLowScoreProfile ? 'rgba(220, 38, 38, 0.2)' : 'rgba(79, 70, 229, 0.2)',
        borderColor: profile.isLowScoreProfile ? '#dc2626' : '#4f46e5',
        borderWidth: 3,
        pointBackgroundColor: profile.isLowScoreProfile ? '#ef4444' : '#6366f1',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: profile.isLowScoreProfile ? '#dc2626' : '#4f46e5',
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.08)'
        },
        pointLabels: {
          color: '#0f172a',
          font: {
            family: 'Plus Jakarta Sans',
            size: 13,
            weight: 700 as const
          }
        },
        ticks: {
          color: '#64748b',
          backdropColor: 'transparent',
          min: 0,
          max: 100,
          stepSize: 20
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#ffffff',
        bodyColor: '#34d399',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true
      }
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0 5rem' }}>
      {/* Banner de alerta*/}
      {profile.isLowScoreProfile && (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fca5a5',
            padding: '1.25rem 1.75rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              flexShrink: 0
            }}
          >
            <AlertTriangle size={24} />
          </div>
          <div>
            <h4 style={{ color: '#991b1b', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.2rem' }}>
              Detección de Evaluación con Respuestas Bajas / Cautela
            </h4>
            <p style={{ color: '#7f1d1d', fontSize: '0.92rem' }}>
              Has seleccionado opciones "En desacuerdo" en la mayoría o totalidad de los reactivos. El diagnóstico muestra los <strong>puntos de riesgo y áreas críticas reales</strong> en lugar de atributos positivos incoherentes.
            </p>
          </div>
        </div>
      )}

      {/* Encabezado */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
        <div
          className="glass-pill"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.25rem',
            marginBottom: '1rem',
            color: profile.isLowScoreProfile ? '#dc2626' : '#4f46e5',
            fontWeight: 700,
            fontSize: '0.88rem'
          }}
        >
          <Award size={18} /> {profile.badge}
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
            fontWeight: 800,
            marginBottom: '0.75rem',
            color: '#0f172a'
          }}
        >
          {profile.title}
        </h1>

        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>{profile.subtitle}</p>
      </div>

      {/* Grid: Columna Izquierda (Radar Chart + Dimension Bars) & Columna Derecha (Profile Details) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {/* Columna Izquierda: Radar Chart.js */}
        <div
          className="glass-panel"
          style={{
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h3
            style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#0f172a'
            }}
          >
            <span>Mapa de Competencias Psicométricas</span>
            <Sparkles size={20} color={profile.isLowScoreProfile ? '#dc2626' : '#4f46e5'} />
          </h3>

          <div style={{ width: '100%', height: '360px', position: 'relative' }}>
            <Radar data={chartData} options={chartOptions} />
          </div>

          {/* Barras de progreso de puntuacion de dimension */}
          <div style={{ width: '100%', marginTop: '2rem' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-muted)' }}>
              Desglose de Dimensiones (%):
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {scores.map((dim) => (
                <div key={dim.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: '#1e293b' }}>{dim.name}</span>
                    <span style={{ fontWeight: 700, color: dim.color }}>{dim.score}%</span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '7px',
                      background: 'rgba(203, 213, 225, 0.5)',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${dim.score}%`,
                        backgroundColor: dim.color,
                        borderRadius: 'var(--radius-full)',
                        transition: 'width 0.8s ease'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha: Análisis y perspectivas del perfil */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Tarjeta de descripcion */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: profile.isLowScoreProfile ? '#dc2626' : '#0284c7' }}>
              Análisis del Perfil Profesional
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.65, fontSize: '1rem' }}>
              {profile.description}
            </p>
          </div>

          {/* Fortalezas y rasgos positivos o de precaución */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                marginBottom: '1rem',
                color: profile.isLowScoreProfile ? '#d97706' : '#059669',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <CheckCircle2 size={20} /> {profile.isLowScoreProfile ? 'Rasgos de Cautela Observados' : 'Fortalezas Clave'}
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {profile.strengths.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.95rem', color: '#1e293b' }}>
                  <span style={{ color: profile.isLowScoreProfile ? '#d97706' : '#059669', fontWeight: 800 }}>•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Puntos negativos y areas de mejora*/}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                marginBottom: '1rem',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <XCircle size={20} /> {profile.isLowScoreProfile ? 'Puntos Críticos y Factores de Riesgo' : 'Áreas de Mejora y Vulnerabilidades'}
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {profile.growthAreas.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.95rem', color: '#1e293b' }}>
                  <span style={{ color: '#dc2626', fontWeight: 800 }}>•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal del rol interactivo con explicacion */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Briefcase size={20} /> Roles Sugeridos en Equipo
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Info size={14} /> Haz clic para ver detalles
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              Haz clic en cualquiera de las tarjetas de rol a continuación para ver su explicación completa:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
              {profile.idealRoles.map((role, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRole(role)}
                  style={{
                    background: selectedRole?.title === role.title ? '#fef3c7' : '#ffffff',
                    border: selectedRole?.title === role.title ? '1.5px solid #d97706' : '1px solid #cbd5e1',
                    color: '#0f172a',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)'
                  }}
                  className="role-pill-btn"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700 }}>{role.title}</span>
                    <Info size={15} style={{ color: '#d97706' }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {role.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Explicacion del Rol */}
      {selectedRole && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setSelectedRole(null)}
        >
          <div
            className="glass-panel animate-fade-in"
            style={{
              maxWidth: '560px',
              width: '100%',
              padding: '2.25rem',
              borderRadius: 'var(--radius-lg)',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span
                  style={{
                    background: '#fef3c7',
                    color: '#b45309',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {selectedRole.category}
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.5rem', color: '#0f172a' }}>
                  {selectedRole.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  color: '#0f172a',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#0284c7', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                📌 ¿En qué consiste este rol?
              </h4>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {selectedRole.description}
              </p>
            </div>

            <div
              style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <h4 style={{ color: '#1d4ed8', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                🎯 ¿Por qué se adapta a tu resultado psicométrico?
              </h4>
              <p style={{ color: '#1e3a8a', lineHeight: 1.55, fontSize: '0.93rem' }}>
                {selectedRole.whyFit}
              </p>
            </div>

            <div style={{ marginTop: '1.75rem', textAlign: 'right' }}>
              <button onClick={() => setSelectedRole(null)} className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>
                Entendido / Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Acciones de pie de pagina */}
      <div
        style={{
          marginTop: '3.5rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1.25rem',
          flexWrap: 'wrap'
        }}
      >
        <button onClick={onReset} className="btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
          <RefreshCw size={18} /> Reintentar Evaluación
        </button>
      </div>
    </div>
  );
};
