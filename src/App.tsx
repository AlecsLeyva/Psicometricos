import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TestRunner } from './components/TestRunner';
import { ResultsView } from './components/ResultsView';
import { Footer } from './components/Footer';
import type { AnswerState } from './types/psychometrics';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'home' | 'test' | 'results'>('home');
  const [answers, setAnswers] = useState<AnswerState>({});

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const hasAnswers = Object.keys(answers).length > 0;

  const handleFinishTest = () => {
    setCurrentTab('results');
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentTab('test');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => setCurrentTab(tab)}
        hasAnswers={hasAnswers}
      />

      <main className="app-container" style={{ flex: 1 }}>
        {currentTab === 'home' && (
          <Hero
            onStartTest={() => setCurrentTab('test')}
          />
        )}

        {currentTab === 'test' && (
          <TestRunner
            answers={answers}
            onAnswer={handleAnswer}
            onFinish={handleFinishTest}
          />
        )}

        {currentTab === 'results' && (
          <ResultsView
            answers={answers}
            onReset={handleReset}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
