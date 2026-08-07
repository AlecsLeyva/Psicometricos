export interface DimensionScore {
  id: string;
  name: string;
  score: number; // 0 - 100%
  color: string;
  description: string;
}

export interface Question {
  id: number;
  category: string;
  questionText: string;
  contextText: string;
  iconName: string;
  primaryDimension: string;
  secondaryDimension?: string;
}

export interface AnswerState {
  [questionId: number]: number;
}

export interface RoleInfo {
  title: string;
  category: string;
  description: string;
  whyFit: string;
}

export interface ProfileResult {
  title: string;
  subtitle: string;
  archetype: string;
  badge: string;
  description: string;
  strengths: string[];
  growthAreas: string[];
  idealRoles: RoleInfo[];
  primaryDimensionId: string;
  isLowScoreProfile?: boolean;
}
