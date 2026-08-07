import type { Question } from '../types/psychometrics';

export const PSYCHOMETRIC_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Liderazgo y Toma de Decisiones',
    questionText: 'Ante situaciones de incertidumbre o presión, tiendo a asumir la iniciativa y guiar al equipo hacia una solución concreta.',
    contextText: 'Evalúa tu propensión al liderazgo proactivo, la toma de riesgos calculados y la orientación al mando resolutivo.',
    iconName: 'Crown',
    primaryDimension: 'liderazgo',
    secondaryDimension: 'resiliencia'
  },
  {
    id: 2,
    category: 'Pensamiento Analítico y Lógica',
    questionText: 'Prefiero tomar decisiones basadas rigurosamente en datos, análisis objetivo y hechos verificables en lugar de la intuición.',
    contextText: 'Mide la preferencia por el razonamiento lógico, el escrutinio técnico y la estructuración métrica de problemas.',
    iconName: 'Brain',
    primaryDimension: 'analitico',
    secondaryDimension: 'liderazgo'
  },
  {
    id: 3,
    category: 'Trabajo en Equipo y Empatía',
    questionText: 'Priorizo mantener la armonía, la cohesión grupal y escuchar el bienestar emocional de mis compañeros por encima del ritmo individual.',
    contextText: 'Analiza tu orientación interpersonal, capacidad de escucha activa, inteligencia emocional y facilitación colaborativa.',
    iconName: 'Users',
    primaryDimension: 'colaboracion',
    secondaryDimension: 'resiliencia'
  },
  {
    id: 4,
    category: 'Innovación y Creatividad',
    questionText: 'Me apasiona proponer enfoques disruptivos y experimentos impredecibles, incluso si implican salir completamente de la zona de confort.',
    contextText: 'Determina la inclinación a la innovación continua, flexibilidad ante el cambio y la ideación fuera de parámetros tradicionales.',
    iconName: 'Lightbulb',
    primaryDimension: 'innovacion',
    secondaryDimension: 'analitico'
  },
  {
    id: 5,
    category: 'Resiliencia y Manejo del Estrés',
    questionText: 'Mantengo la calma y la claridad mental cuando los planes fallan inesperadamente o cuando me enfrento a críticas directas.',
    contextText: 'Examina la tolerancia al estrés, la autorregulación emocional y la agilidad de recuperación frente a la adversidad.',
    iconName: 'ShieldCheck',
    primaryDimension: 'resiliencia',
    secondaryDimension: 'colaboracion'
  }
];

export const DIMENSIONS_INFO = [
  {
    id: 'liderazgo',
    name: 'Liderazgo & Dirección',
    color: 'rgba(99, 102, 241, 0.85)',
    description: 'Capacidad para guiar equipos, tomar decisiones bajo presión y motivar hacia objetivos comunes.'
  },
  {
    id: 'analitico',
    name: 'Pensamiento Analítico',
    color: 'rgba(14, 165, 233, 0.85)',
    description: 'Enfoque estructurado, análisis basado en evidencia y meticulosidad en la resolución de problemas.'
  },
  {
    id: 'colaboracion',
    name: 'Trabajo en Equipo & Empatía',
    color: 'rgba(16, 185, 129, 0.85)',
    description: 'Inteligencia emocional, facilitación de acuerdos y empatía interpersonal.'
  },
  {
    id: 'innovacion',
    name: 'Innovación & Creatividad',
    color: 'rgba(245, 158, 11, 0.85)',
    description: 'Generación de ideas novedosas, visión estratégica y adaptabilidad al cambio.'
  },
  {
    id: 'resiliencia',
    name: 'Resiliencia & Estabilidad',
    color: 'rgba(236, 72, 153, 0.85)',
    description: 'Tolerancia al estrés, autorregulación y templanza operativa ante desafíos.'
  }
];
