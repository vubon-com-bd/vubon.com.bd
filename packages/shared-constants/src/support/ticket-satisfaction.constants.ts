import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { RATING } from '../common/rating.constants';

export const TICKET_SATISFACTION = {
  TYPES: {
    ...COMMON_TYPES,
    ...RATING,
    VERY_SATISFIED: 'very_satisfied',
    SATISFIED: 'satisfied',
    NEUTRAL: 'neutral',
    DISSATISFIED: 'dissatisfied',
    VERY_DISSATISFIED: 'very_dissatisfied',
  },
  RATING: { ...RATING },
  SATISFACTION_SCORES: {
    VERY_SATISFIED: 5,
    SATISFIED: 4,
    NEUTRAL: 3,
    DISSATISFIED: 2,
    VERY_DISSATISFIED: 1,
  },
  MIN_RATING_FOR_GOOD: 4,
  MIN_RATING_FOR_EXCELLENT: 5,
} as const;
