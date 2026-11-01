export const SEO_SCORE_GRADE = {
  A_PLUS: 'a_plus',
  A: 'a',
  B: 'b',
  C: 'c',
  D: 'd',
  F: 'f',
} as const;

export const SEO_SCORE = {
  MIN: 0,
  MAX: 100,
  EXCELLENT_THRESHOLD: 90,
  GOOD_THRESHOLD: 80,
  FAIR_THRESHOLD: 60,
  POOR_THRESHOLD: 40,
  CRITICAL_THRESHOLD: 20,
  DEFAULT: 0,
} as const;

export const SEO_SCORE_WEIGHT = {
  content: 30,
  technical: 25,
  performance: 20,
  mobile: 15,
  backlinks: 10,
} as const;

export type SeoScoreGradeType = (typeof SEO_SCORE_GRADE)[keyof typeof SEO_SCORE_GRADE];
