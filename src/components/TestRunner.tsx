import React, { useState } from 'react';
import { PSYCHOMETRIC_QUESTIONS } from '../data/questions';
import type { AnswerState } from '../types/psychometrics';
import { ArrowLeft, ArrowRight, Brain, Crown, Lightbulb, ShieldCheck, Users, HelpCircle } from 'lucide-react';

interface TestRunnerProps {
  answers: AnswerState;
  onAnswer: (questionId: number, value: number) => void;
  onFinish: () => void;
}

export const TestRunner: React.FC<TestRunnerProps> = ({ answers, onAnswer, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentQuestion = PSYCHOMETRIC_QUESTIONS[currentIndex];
  const totalQuestions = PSYCHOMETRIC_QUESTIONS.length;
  const currentAnswer = answers[currentQuestion.id];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown': return <Crown size={22} className="text-indigo-400" />;
      case 'Brain': return <Brain size={22} className="text-sky-400" />;
      case 'Users': return <Users size={22} className="text-emerald-400" />;
      case 'Lightbulb': return <Lightbulb size={22} className="text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck size={22} className="text-pink-400" />;
      default: return <HelpCircle size={22} />;
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const progressPercentage = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '840px', margin: '2.5rem auto 4rem' }}>
      {/* Encabezado y progreso */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-sky)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Pregunta {currentIndex + 1} de {totalQuestions}
        </span>
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          {progressPercentage}% Completado
        </span>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      {/* Tarjeta de pregunta */}
      <div
        className="glass-panel"
        style={{
          padding: '2.5rem 2rem',
          borderRadius: 'var(--radius-lg)',
          position: 'relative'
        }}
      >
        {/* Categoria*/}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            background: '#f1f5f9',
            border: '1px solid #cbd5e1',
            borderRadius: 'var(--radius-full)',
            color: 'var(--text-main)',
            fontSize: '0.88rem',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}
        >
          {getCategoryIcon(currentQuestion.iconName)}
          <span>{currentQuestion.category}</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(1.35rem, 3.2vw, 1.85rem)',
            fontWeight: 700,
            lineHeight: 1.4,
            marginBottom: '1.25rem',
            color: 'var(--text-main)'
          }}
        >
          "{currentQuestion.questionText}"
        </h2>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', fontStyle: 'italic' }}>
          {currentQuestion.contextText}
        </p>

        {/* Escala Likert  */}
        <div className="likert-container">
          <div className="likert-label disagree">
            En desacuerdo
          </div>

          <div className="likert-options">
            {[1, 2, 3, 4, 5, 6, 7].map((val) => (
              <button
                key={val}
                onClick={() => onAnswer(currentQuestion.id, val)}
                className={`likert-btn size-${val} val-${val} ${currentAnswer === val ? 'selected' : ''}`}
                title={`Opción ${val}`}
                aria-label={`Seleccionar valor ${val}`}
              />
            ))}
          </div>

          <div className="likert-label agree">
            De acuerdo
          </div>
        </div>

        {/* Indicador de respuesta */}
        <div style={{ textAlign: 'center', height: '24px', marginBottom: '1.5rem' }}>
          {currentAnswer !== undefined ? (
            <span style={{ fontSize: '0.9rem', color: '#34d399', fontWeight: 600 }}>
              ✓ Respuesta seleccionada: {currentAnswer === 4 ? 'Neutral' : currentAnswer > 4 ? `De acuerdo (${currentAnswer})` : `En desacuerdo (${currentAnswer})`}
            </span>
          ) : (
            <span style={{ fontSize: '0.88rem', color: 'var(--text-dim)' }}>
              Haz clic en un círculo para responder
            </span>
          )}
        </div>

        {/* Botones de accion*/}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="btn-secondary"
            style={{
              opacity: currentIndex === 0 ? 0.4 : 1,
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <ArrowLeft size={18} /> Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={currentAnswer === undefined}
            className="btn-primary"
            style={{
              opacity: currentAnswer === undefined ? 0.5 : 1,
              cursor: currentAnswer === undefined ? 'not-allowed' : 'pointer'
            }}
          >
            {currentIndex === totalQuestions - 1 ? 'Ver Mi Gráfica Final' : 'Siguiente'} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
