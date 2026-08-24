/**
 * Ticket Satisfaction Constants
 * Customer satisfaction ratings for support tickets
 */

export const TICKET_SATISFACTION = {
  // Satisfaction Levels
  LEVELS: {
    VERY_UNSATISFIED: 'very_unsatisfied',
    UNSATISFIED: 'unsatisfied',
    NEUTRAL: 'neutral',
    SATISFIED: 'satisfied',
    VERY_SATISFIED: 'very_satisfied',
  } as const,

  // Satisfaction Scores
  SCORES: {
    VERY_UNSATISFIED: 1,
    UNSATISFIED: 2,
    NEUTRAL: 3,
    SATISFIED: 4,
    VERY_SATISFIED: 5,
  } as const,

  // Satisfaction Emojis (for UI)
  EMOJIS: {
    VERY_UNSATISFIED: '😡',
    UNSATISFIED: '😞',
    NEUTRAL: '😐',
    SATISFIED: '😊',
    VERY_SATISFIED: '😍',
  } as const,

  // Satisfaction Colors (for UI)
  COLORS: {
    VERY_UNSATISFIED: '#red-600',
    UNSATISFIED: '#orange-500',
    NEUTRAL: '#yellow-500',
    SATISFIED: '#green-500',
    VERY_SATISFIED: '#green-600',
  } as const,

  // Satisfaction Categories
  CATEGORIES: {
    NEGATIVE: 'negative',
    NEUTRAL: 'neutral',
    POSITIVE: 'positive',
  } as const,

  // CSAT (Customer Satisfaction Score) Ranges
  CSAT_RANGES: {
    POOR: 0,
    AVERAGE: 3,
    GOOD: 4,
    EXCELLENT: 4.5,
  } as const,
} as const;

// Satisfaction Levels
export type TicketSatisfactionLevel =
  (typeof TICKET_SATISFACTION.LEVELS)[keyof typeof TICKET_SATISFACTION.LEVELS];

// Satisfaction Scores
export type TicketSatisfactionScore =
  (typeof TICKET_SATISFACTION.SCORES)[keyof typeof TICKET_SATISFACTION.SCORES];

// Satisfaction Emojis
export type TicketSatisfactionEmoji =
  (typeof TICKET_SATISFACTION.EMOJIS)[keyof typeof TICKET_SATISFACTION.EMOJIS];

// Satisfaction Categories
export type TicketSatisfactionCategory =
  (typeof TICKET_SATISFACTION.CATEGORIES)[keyof typeof TICKET_SATISFACTION.CATEGORIES];

// Utility Functions
export function ticketSatisfactionGetLabel(level: TicketSatisfactionLevel): string {
  const labels: Record<TicketSatisfactionLevel, string> = {
    [TICKET_SATISFACTION.LEVELS.VERY_UNSATISFIED]: 'Very Unsatisfied',
    [TICKET_SATISFACTION.LEVELS.UNSATISFIED]: 'Unsatisfied',
    [TICKET_SATISFACTION.LEVELS.NEUTRAL]: 'Neutral',
    [TICKET_SATISFACTION.LEVELS.SATISFIED]: 'Satisfied',
    [TICKET_SATISFACTION.LEVELS.VERY_SATISFIED]: 'Very Satisfied',
  };
  return labels[level] || 'Unknown';
}

export function ticketSatisfactionGetScore(
  level: TicketSatisfactionLevel
): TicketSatisfactionScore {
  const scores: Record<TicketSatisfactionLevel, TicketSatisfactionScore> = {
    [TICKET_SATISFACTION.LEVELS.VERY_UNSATISFIED]: TICKET_SATISFACTION.SCORES.VERY_UNSATISFIED,
    [TICKET_SATISFACTION.LEVELS.UNSATISFIED]: TICKET_SATISFACTION.SCORES.UNSATISFIED,
    [TICKET_SATISFACTION.LEVELS.NEUTRAL]: TICKET_SATISFACTION.SCORES.NEUTRAL,
    [TICKET_SATISFACTION.LEVELS.SATISFIED]: TICKET_SATISFACTION.SCORES.SATISFIED,
    [TICKET_SATISFACTION.LEVELS.VERY_SATISFIED]: TICKET_SATISFACTION.SCORES.VERY_SATISFIED,
  };
  return scores[level] || 3;
}

export function ticketSatisfactionIsPositive(level: TicketSatisfactionLevel): boolean {
  const positiveLevels: TicketSatisfactionLevel[] = [
    TICKET_SATISFACTION.LEVELS.SATISFIED,
    TICKET_SATISFACTION.LEVELS.VERY_SATISFIED,
  ];
  return positiveLevels.includes(level);
}

export function ticketSatisfactionIsNegative(level: TicketSatisfactionLevel): boolean {
  const negativeLevels: TicketSatisfactionLevel[] = [
    TICKET_SATISFACTION.LEVELS.VERY_UNSATISFIED,
    TICKET_SATISFACTION.LEVELS.UNSATISFIED,
  ];
  return negativeLevels.includes(level);
}

export function ticketSatisfactionGetEmoji(
  level: TicketSatisfactionLevel
): TicketSatisfactionEmoji {
  const emojis: Record<TicketSatisfactionLevel, TicketSatisfactionEmoji> = {
    [TICKET_SATISFACTION.LEVELS.VERY_UNSATISFIED]: TICKET_SATISFACTION.EMOJIS.VERY_UNSATISFIED,
    [TICKET_SATISFACTION.LEVELS.UNSATISFIED]: TICKET_SATISFACTION.EMOJIS.UNSATISFIED,
    [TICKET_SATISFACTION.LEVELS.NEUTRAL]: TICKET_SATISFACTION.EMOJIS.NEUTRAL,
    [TICKET_SATISFACTION.LEVELS.SATISFIED]: TICKET_SATISFACTION.EMOJIS.SATISFIED,
    [TICKET_SATISFACTION.LEVELS.VERY_SATISFIED]: TICKET_SATISFACTION.EMOJIS.VERY_SATISFIED,
  };
  return emojis[level] || '😐';
}

export function ticketSatisfactionGetCategory(
  level: TicketSatisfactionLevel
): TicketSatisfactionCategory {
  if (ticketSatisfactionIsPositive(level)) {
    return TICKET_SATISFACTION.CATEGORIES.POSITIVE;
  }
  if (ticketSatisfactionIsNegative(level)) {
    return TICKET_SATISFACTION.CATEGORIES.NEGATIVE;
  }
  return TICKET_SATISFACTION.CATEGORIES.NEUTRAL;
}
