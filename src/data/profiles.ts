import type { DimensionScore, ProfileResult } from '../types/psychometrics';

export function calculateScores(answers: Record<number, number>): DimensionScore[] {
  // Answers are 1 to 7. Standardized to percentage scale (0 to 100).
  // 1 = 0%, 4 = 50%, 7 = 100%
  const getPercentage = (val: number | undefined) => {
    if (val === undefined) return 0;
    return Math.round(((val - 1) / 6) * 100);
  };

  const q1 = getPercentage(answers[1]); // Liderazgo
  const q2 = getPercentage(answers[2]); // Analítico
  const q3 = getPercentage(answers[3]); // Colaboración
  const q4 = getPercentage(answers[4]); // Innovación
  const q5 = getPercentage(answers[5]); // Resiliencia

  // Cross-weighted dimension calculation
  const liderazgoScore = Math.round(q1 * 0.85 + q2 * 0.15);
  const analiticoScore = Math.round(q2 * 0.85 + q4 * 0.15);
  const colaboracionScore = Math.round(q3 * 0.85 + q5 * 0.15);
  const innovacionScore = Math.round(q4 * 0.85 + q1 * 0.15);
  const resilienciaScore = Math.round(q5 * 0.85 + q3 * 0.15);

  return [
    {
      id: 'liderazgo',
      name: 'Liderazgo & Dirección',
      score: liderazgoScore,
      color: '#6366f1',
      description: 'Capacidad para orientar, decidir e influir positivamente.'
    },
    {
      id: 'analitico',
      name: 'Pensamiento Analítico',
      score: analiticoScore,
      color: '#0ea5e9',
      description: 'Rigor lógico, enfoque en datos y estructura resolutiva.'
    },
    {
      id: 'colaboracion',
      name: 'Trabajo en Equipo & Empatía',
      score: colaboracionScore,
      color: '#10b981',
      description: 'Inteligencia emocional y armonía colaborativa.'
    },
    {
      id: 'innovacion',
      name: 'Innovación & Creatividad',
      score: innovacionScore,
      color: '#f59e0b',
      description: 'Visión disruptiva, originalidad y adaptabilidad.'
    },
    {
      id: 'resiliencia',
      name: 'Resiliencia & Estabilidad',
      score: resilienciaScore,
      color: '#ec4899',
      description: 'Tolerancia a la presión y templanza emocional.'
    }
  ];
}

export function determineProfile(scores: DimensionScore[]): ProfileResult {
  const averageScore = Math.round(scores.reduce((acc, s) => acc + s.score, 0) / scores.length);
  const sorted = [...scores].sort((a, b) => b.score - a.score);
  const top = sorted[0];
  const lowest = sorted[sorted.length - 1];

  // CASE 1: Low Score Profile (User answered mostly 1-2 / "En desacuerdo")
  if (averageScore <= 30) {
    return {
      title: 'Perfil en Desconexión / Riesgo Operativo',
      subtitle: 'Baja Afinación en las Dimensiones Evaluadas o Fatiga Laboral',
      archetype: 'Evaluación de Cautela y Retraimiento',
      badge: 'Arquetipo en Riesgo (RSK-00)',
      primaryDimensionId: lowest.id,
      isLowScoreProfile: true,
      description:
        'Tus respuestas reflejan una puntuación predominantemente baja en todas las competencias psicométricas (Liderazgo, Análisis, Colaboración, Innovación y Resiliencia). Esto no te define como persona, pero señala un estado de inhibición operativa, desmotivación o fatiga intensa.',
      strengths: [
        'Alto sentido de alerta o cautela defensiva frente a compromisos',
        'Tendencia a no asumir riesgos innecesarios en momentos de desconfianza',
        'Conciencia implícita de insatisfacción o necesidad de cambio de entorno'
      ],
      growthAreas: [
        '⚠️ Pasividad en la toma de decisiones y bloqueo ante la incertidumbre',
        '⚠️ Dificultad para colaborar abiertamente o comunicar necesidades al equipo',
        '⚠️ Poca tolerancia al estrés, lo que genera frustración o abandono temprano',
        '⚠️ Resistencia al cambio y falta de iniciativa propia para proponer soluciones'
      ],
      idealRoles: [
        {
          title: 'Auxiliar de Tareas Guiadas',
          category: 'Soporte Operativo',
          description: 'Puesto centrado en ejecutar instrucciones claras y directas sin toma de decisiones autónomas complejas.',
          whyFit: 'Proporciona un entorno estructurado sin presión alta, ideal para reconstruir confianza operativa.'
        },
        {
          title: 'Operador de Procesos Estandarizados',
          category: 'Operaciones',
          description: 'Rol enfocado en repetir procedimientos metodológicos prefijados con listas de chequeo.',
          whyFit: 'Reduce la necesidad de asumir riesgos estratégicos o resolver ambigüedades.'
        },
        {
          title: 'Documentador de Inventario / Datos',
          category: 'Administración',
          description: 'Función de registro y verificación sistemática de información previa.',
          whyFit: 'Permite trabajar a un ritmo controlado sin exposición a conflictos grupales o exigencia de innovación.'
        },
        {
          title: 'Técnico de Control de Registro',
          category: 'Calidad',
          description: 'Revisión pasiva de formularios y cumplimiento de normativas de entrada.',
          whyFit: 'Mantiene límites claros de responsabilidad diaria para evitar sobrecargas de estrés.'
        }
      ]
    };
  }

  // CASE 2: Dominant Profiles (Normal to High Scores)
  switch (top.id) {
    case 'liderazgo':
      return {
        title: 'El Comandante Estratégico',
        subtitle: 'Perfil Orientado a la Ejecución y Dirección de Equipos',
        archetype: 'Líder Visionario y Resolutivo',
        badge: 'Arquetipo Liderazgo (LDR-16)',
        primaryDimensionId: 'liderazgo',
        description:
          'Posees un impulso natural para tomar decisiones decisivas, articular metas claras y coordinar a otros en entornos desafiantes. Eres respetado por tu firmeza y claridad operativa.',
        strengths: [
          'Toma de decisiones rápida y firme bajo situaciones complejas',
          'Capacidad para delegar responsabilidades y exigir resultados',
          'Visión centrada en objetivos y entregables de alto impacto',
          'Asunción de la iniciativa en momentos de estancamiento'
        ],
        growthAreas: [
          `Punto débil detectado en ${lowest.name}: puede dificultar la empatía con el ritmo de los demás`,
          'Riesgo de impaciencia ante procesos de consenso lentos',
          'Tendencia a imponer soluciones antes de escuchar alternativas del equipo'
        ],
        idealRoles: [
          {
            title: 'Director de Proyectos / Oficina de Gestión',
            category: 'Gestión',
            description: 'Responsable del cumplimiento de hitos, presupuesto y alineación del equipo de proyecto.',
            whyFit: 'Su alta capacidad de decisión y liderazgo garantiza que los proyectos avancen sin cuellos de botella.'
          },
          {
            title: 'Líder Técnico de Equipo',
            category: 'Liderazgo Técnico',
            description: 'Guía el trabajo diario de desarrolladores o especialistas, priorizando tareas complejas.',
            whyFit: 'Combina firmeza operativa con la habilidad de destrabar obstáculos del equipo.'
          },
          {
            title: 'Gestor Estratégico de Producto',
            category: 'Producto',
            description: 'Define la hoja de ruta del producto y articula la visión entre negocio y tecnología.',
            whyFit: 'Sobresale en tomar decisiones de priorización difíciles manteniendo la mirada en el objetivo final.'
          },
          {
            title: 'Fundador / Gerente Operativo',
            category: 'Ejecutivo',
            description: 'Lidera la estrategia general y la ejecución empresarial en entornos dinámicos.',
            whyFit: 'Su templanza e iniciativa son claves para dirigir organizaciones en crecimiento.'
          }
        ]
      };

    case 'analitico':
      return {
        title: 'El Arquitecto Analítico',
        subtitle: 'Perfil Sistemático, Lógico y Orientado a Datos',
        archetype: 'Especialista en Diagnóstico y Estructura',
        badge: 'Arquetipo Analítico (ANL-16)',
        primaryDimensionId: 'analitico',
        description:
          'Tu mente funciona con precisión científica. Evalúas las situaciones con imparcialidad, buscas patrones objetivos y garantizas que las decisiones estén sustentadas en evidencia sólida.',
        strengths: [
          'Rigor metódico y capacidad excepcional de análisis de datos',
          'Detección anticipada de fallas sistémicas y riesgos ocultos',
          'Pensamiento crítico objetivo sin sesgos emocionales',
          'Diseño de estructuras de trabajo estables y bien documentadas'
        ],
        growthAreas: [
          `Menor desarrollo en ${lowest.name}: puede ralentizar acciones cuando faltan datos perfectos`,
          'Tendencia a la "parálisis por análisis" ante fechas límite ajustadas',
          'Riesgo de transmitir críticas demasiado frías o técnicas'
        ],
        idealRoles: [
          {
            title: 'Científico / Analista de Datos',
            category: 'Inteligencia de Negocios',
            description: 'Transforma volúmenes de información en modelos predictivos y conocimientos de negocio.',
            whyFit: 'Su pensamiento lógico y rigor métrico son indispensables para encontrar patrones verdaderos.'
          },
          {
            title: 'Arquitecto de Software y Sistemas',
            category: 'Ingeniería',
            description: 'Diseña la estructura técnica, componentes y estándares de escalabilidad de sistemas.',
            whyFit: 'Garantiza la solidez del diseño eliminando redundancias y vulnerabilidades.'
          },
          {
            title: 'Consultor Estratégico de Procesos',
            category: 'Consultoría',
            description: 'Audita flujos de trabajo operativos para optimizar costos y eficiencia.',
            whyFit: 'Su capacidad de diagnóstico imparcial permite detectar ineficiencias invisibles.'
          },
          {
            title: 'Auditor de Calidad y Ciberseguridad',
            category: 'Seguridad',
            description: 'Inspecciona código, normativas y protocolos para verificar su cumplimiento estricto.',
            whyFit: 'Su enfoque meticuloso previene fallos graves antes de que salgan a producción.'
          }
        ]
      };

    case 'colaboracion':
      return {
        title: 'El Conector Empático',
        subtitle: 'Perfil Facilitador de Cohesión y Cultura Humana',
        archetype: 'Catalizador de Armonía y Sinergia',
        badge: 'Arquetipo Colaborador (COL-16)',
        primaryDimensionId: 'colaboracion',
        description:
          'Tu gran fortaleza radica en la inteligencia interpersonal. Creas ambientes de confianza, resuelves conflictos con diplomacia y logras que el equipo funcione como una unidad sinérgica.',
        strengths: [
          'Inteligencia emocional y escucha activa profunda',
          'Habilidad para mediar en conflictos y alcanzar consensos duraderos',
          'Capacidad para hacer sentir valorados a todos los integrantes del equipo',
          'Fomento de un clima laboral de confianza y baja tensión'
        ],
        growthAreas: [
          `Bajo puntaje relativo en ${lowest.name}: riesgo de evitar conversaciones difíciles por proteger la armonía`,
          'Dificultad para decir "no" ante solicitudes excesivas de compañeros',
          'Riesgo de postergar decisiones urgentes por buscar unanimidad total'
        ],
        idealRoles: [
          {
            title: 'Director de Talento y Cultura / RRHH',
            category: 'Gestión Humana',
            description: 'Fomenta el desarrollo del talento, clima organizacional y resolución de conflictos.',
            whyFit: 'Su alta empatía le permite conectar genuinamente con las necesidades del equipo.'
          },
          {
            title: 'Facilitador Ágil / Coordinador de Metodología',
            category: 'Metodología',
            description: 'Facilita los procesos de trabajo y elimina bloqueos interpersonales en equipos.',
            whyFit: 'Su vocación de servicio ayuda al equipo a autoorganizarse sin fricciones.'
          },
          {
            title: 'Especialista en Éxito del Cliente',
            category: 'Relaciones',
            description: 'Acompaña a clientes clave asegurando su satisfacción y retención a largo plazo.',
            whyFit: 'Crea vínculos de confianza profundos convirtiendo usuarios en aliados.'
          },
          {
            title: 'Mediador Organizacional',
            category: 'Consultoría',
            description: 'Interviene en desacuerdos entre departamentos para construir acuerdos mutuos.',
            whyFit: 'Su imparcialidad compasiva desarma tensiones complejas.'
          }
        ]
      };

    case 'innovacion':
      return {
        title: 'El Visionario Creativo',
        subtitle: 'Perfil Explorador de Enfoques Disruptivos',
        archetype: 'Ideador e Innovador Continuo',
        badge: 'Arquetipo Innovador (INV-16)',
        primaryDimensionId: 'innovacion',
        description:
          'No te conformas con lo tradicional. Constantemente imaginas nuevas posibilidades, conectas conceptos aparentemente desconectados y desafías las formas usuales de resolver problemas.',
        strengths: [
          'Pensamiento lateral y generación inagotable de conceptos originales',
          'Gran adaptabilidad y agilidad mental frente a cambios imprevistos',
          'Entusiasmo por experimentar con nuevas herramientas y metodologías',
          'Habilidad para reformular problemas antiguos desde ángulos novedosos'
        ],
        growthAreas: [
          `Vulnerabilidad en ${lowest.name}: riesgo de perder interés una vez pasada la etapa inicial de ideación`,
          'Dificultad para ceñirse a tareas rutinarias u operativas repetitivas',
          'Tendencia a dispersarse en múltiples ideas simultáneas sin cerrar proyectos'
        ],
        idealRoles: [
          {
            title: 'Especialista en Experiencia e Interfaz de Usuario (UX/UI)',
            category: 'Diseño',
            description: 'Investiga y diseña experiencias digitales innovadoras e intuitivas para el usuario.',
            whyFit: 'Canaliza su creatividad en soluciones conceptuales atractivas y funcionales.'
          },
          {
            title: 'Diseñador de Productos Digitales',
            category: 'Producto',
            description: 'Crea nuevas características de producto combinando estética, usabilidad y viabilidad.',
            whyFit: 'Su capacidad de pensar fuera de lo común genera diferenciales competitivos reales.'
          },
          {
            title: 'Director de Innovación y Desarrollo (I+D)',
            category: 'Estrategia',
            description: 'Lidera la investigación de nuevas tecnologías y oportunidades de mercado.',
            whyFit: 'Su curiosidad natural mantiene a la organización a la vanguardia.'
          },
          {
            title: 'Consultor de Transformación Digital',
            category: 'Consultoría',
            description: 'Reinventa modelos de negocio tradicionales aplicando tecnología moderna.',
            whyFit: 'Desafía inercias culturales proponiendo soluciones frescas.'
          }
        ]
      };

    case 'resiliencia':
    default:
      return {
        title: 'El Ancla Resiliente',
        subtitle: 'Perfil de Alta Estabilidad y Templanza Operativa',
        archetype: 'Pilar de Serenidad y Continuidad',
        badge: 'Arquetipo Resiliente (RES-16)',
        primaryDimensionId: 'resiliencia',
        description:
          'Destacas por tu ecuanimidad e inquebrantable serenidad ante la volatilidad. Transmites calma a tu entorno y aseguras la continuidad operativa incluso en medio de crisis severas.',
        strengths: [
          'Elevada tolerancia al estrés y autorregulación en momentos críticos',
          'Persistencia y serenidad cuando los proyectos sufren retrasos o fallos',
          'Estabilidad emocional que brinda seguridad psicológica al equipo',
          'Enfoque metódico de recuperación inmediata tras contratiempos'
        ],
        growthAreas: [
          `Menor puntuación en ${lowest.name}: riesgo de parecer impasible o poco reactivo ante urgencias reales`,
          'Tendencia a acumular presión internamente en lugar de comunicarla a tiempo',
          'A veces requiere un estímulo externo para buscar activamente la innovación'
        ],
        idealRoles: [
          {
            title: 'Ingeniero de Estabilidad de Infraestructura y Operaciones',
            category: 'Infraestructura',
            description: 'Mantiene servidores e infraestructura crítica funcionando de manera continua sin caídas.',
            whyFit: 'Su cabeza fría en medio de incidentes es vital para resolver fallas bajo presión.'
          },
          {
            title: 'Gestor de Incidentes y Crisis',
            category: 'Operaciones',
            description: 'Coordina la respuesta inmediata ante emergencias operativas o de seguridad.',
            whyFit: 'Mantiene la calma y el orden cuando el resto del equipo entra en tensión.'
          },
          {
            title: 'Coordinador de Operaciones Continuas',
            category: 'Logística',
            description: 'Supervisa que las entregas y la producción no se detengan por imprevistos.',
            whyFit: 'Su resistencia a la frustración garantiza la constancia en el servicio.'
          },
          {
            title: 'Especialista en Soporte Técnico Crítico',
            category: 'Soporte',
            description: 'Atiende usuarios insatisfechos o problemas complejos con paciencia imperturbable.',
            whyFit: 'Desescala momentos de alta tensión con actitud profesional y resolutiva.'
          }
        ]
      };
  }
}
