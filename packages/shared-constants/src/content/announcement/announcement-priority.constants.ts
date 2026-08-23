/**
 * Announcement Priority Constants
 * Priority levels for announcements
 */

export const CONTENT_ANNOUNCEMENT_PRIORITY = {
  // Priority Levels
  LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
    EMERGENCY: 'emergency',
  } as const,

  // Priority Scores
  SCORES: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4,
    EMERGENCY: 5,
  } as const,

  // Priority Colors (for UI)
  COLORS: {
    LOW: '#10B981',
    MEDIUM: '#3B82F6',
    HIGH: '#F59E0B',
    CRITICAL: '#EF4444',
    EMERGENCY: '#7F1D1D',
  } as const,

  // Priority Icons
  ICONS: {
    LOW: 'info',
    MEDIUM: 'alert',
    HIGH: 'warning',
    CRITICAL: 'error',
    EMERGENCY: 'emergency',
  } as const,

  // Priority Badges
  BADGES: {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    CRITICAL: 'Critical',
    EMERGENCY: 'Emergency',
  } as const,

  // Priority Timeframes (in hours)
  TIMEFRAMES: {
    LOW: 72,
    MEDIUM: 48,
    HIGH: 24,
    CRITICAL: 12,
    EMERGENCY: 4,
  } as const,

  // Priority Escalation
  ESCALATION: {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2,
    CRITICAL: 3,
    EMERGENCY: 4,
  } as const,

  // Priority Response Times (in hours)
  RESPONSE_TIMES: {
    LOW: 48,
    MEDIUM: 24,
    HIGH: 12,
    CRITICAL: 6,
    EMERGENCY: 2,
  } as const,

  // Priority Resolution Times (in hours)
  RESOLUTION_TIMES: {
    LOW: 72,
    MEDIUM: 48,
    HIGH: 24,
    CRITICAL: 12,
    EMERGENCY: 6,
  } as const,
} as const;

// Priority Levels
export type ContentAnnouncementPriorityLevel =
  (typeof CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS)[keyof typeof CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS];

// Priority Scores
export type ContentAnnouncementPriorityScore =
  (typeof CONTENT_ANNOUNCEMENT_PRIORITY.SCORES)[keyof typeof CONTENT_ANNOUNCEMENT_PRIORITY.SCORES];

// Priority Colors
export type ContentAnnouncementPriorityColor =
  (typeof CONTENT_ANNOUNCEMENT_PRIORITY.COLORS)[keyof typeof CONTENT_ANNOUNCEMENT_PRIORITY.COLORS];

// Priority Icons
export type ContentAnnouncementPriorityIcon =
  (typeof CONTENT_ANNOUNCEMENT_PRIORITY.ICONS)[keyof typeof CONTENT_ANNOUNCEMENT_PRIORITY.ICONS];

// Priority Badges
export type ContentAnnouncementPriorityBadge =
  (typeof CONTENT_ANNOUNCEMENT_PRIORITY.BADGES)[keyof typeof CONTENT_ANNOUNCEMENT_PRIORITY.BADGES];

// Priority Timeframes
export type ContentAnnouncementPriorityTimeout =
  (typeof CONTENT_ANNOUNCEMENT_PRIORITY.TIMEFRAMES)[keyof typeof CONTENT_ANNOUNCEMENT_PRIORITY.TIMEFRAMES];

// Priority Escalation
export type ContentAnnouncementPriorityEscalation =
  (typeof CONTENT_ANNOUNCEMENT_PRIORITY.ESCALATION)[keyof typeof CONTENT_ANNOUNCEMENT_PRIORITY.ESCALATION];

// Priority Response Times
export type ContentAnnouncementPriorityResponseTime =
  (typeof CONTENT_ANNOUNCEMENT_PRIORITY.RESPONSE_TIMES)[keyof typeof CONTENT_ANNOUNCEMENT_PRIORITY.RESPONSE_TIMES];

// Priority Resolution Times
export type ContentAnnouncementPriorityResolutionTime =
  (typeof CONTENT_ANNOUNCEMENT_PRIORITY.RESOLUTION_TIMES)[keyof typeof CONTENT_ANNOUNCEMENT_PRIORITY.RESOLUTION_TIMES];

// Utility Functions
export function contentAnnouncementPriorityGetLevelLabel(
  level: ContentAnnouncementPriorityLevel
): string {
  const labels: Record<ContentAnnouncementPriorityLevel, string> = {
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.LOW]: 'Low',
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.MEDIUM]: 'Medium',
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.HIGH]: 'High',
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.CRITICAL]: 'Critical',
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.EMERGENCY]: 'Emergency',
  };
  return labels[level] || 'Unknown Priority';
}

export function contentAnnouncementPriorityGetScore(
  level: ContentAnnouncementPriorityLevel
): ContentAnnouncementPriorityScore {
  const scoreMap: Record<ContentAnnouncementPriorityLevel, ContentAnnouncementPriorityScore> = {
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.LOW]: CONTENT_ANNOUNCEMENT_PRIORITY.SCORES.LOW,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.MEDIUM]: CONTENT_ANNOUNCEMENT_PRIORITY.SCORES.MEDIUM,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.HIGH]: CONTENT_ANNOUNCEMENT_PRIORITY.SCORES.HIGH,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.CRITICAL]: CONTENT_ANNOUNCEMENT_PRIORITY.SCORES.CRITICAL,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.EMERGENCY]:
      CONTENT_ANNOUNCEMENT_PRIORITY.SCORES.EMERGENCY,
  };
  return scoreMap[level] || CONTENT_ANNOUNCEMENT_PRIORITY.SCORES.MEDIUM;
}

export function contentAnnouncementPriorityGetColor(
  level: ContentAnnouncementPriorityLevel
): ContentAnnouncementPriorityColor {
  const colorMap: Record<ContentAnnouncementPriorityLevel, ContentAnnouncementPriorityColor> = {
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.LOW]: CONTENT_ANNOUNCEMENT_PRIORITY.COLORS.LOW,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.MEDIUM]: CONTENT_ANNOUNCEMENT_PRIORITY.COLORS.MEDIUM,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.HIGH]: CONTENT_ANNOUNCEMENT_PRIORITY.COLORS.HIGH,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.CRITICAL]: CONTENT_ANNOUNCEMENT_PRIORITY.COLORS.CRITICAL,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.EMERGENCY]:
      CONTENT_ANNOUNCEMENT_PRIORITY.COLORS.EMERGENCY,
  };
  return colorMap[level] || CONTENT_ANNOUNCEMENT_PRIORITY.COLORS.MEDIUM;
}

export function contentAnnouncementPriorityGetIcon(
  level: ContentAnnouncementPriorityLevel
): ContentAnnouncementPriorityIcon {
  const iconMap: Record<ContentAnnouncementPriorityLevel, ContentAnnouncementPriorityIcon> = {
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.LOW]: CONTENT_ANNOUNCEMENT_PRIORITY.ICONS.LOW,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.MEDIUM]: CONTENT_ANNOUNCEMENT_PRIORITY.ICONS.MEDIUM,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.HIGH]: CONTENT_ANNOUNCEMENT_PRIORITY.ICONS.HIGH,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.CRITICAL]: CONTENT_ANNOUNCEMENT_PRIORITY.ICONS.CRITICAL,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.EMERGENCY]: CONTENT_ANNOUNCEMENT_PRIORITY.ICONS.EMERGENCY,
  };
  return iconMap[level] || CONTENT_ANNOUNCEMENT_PRIORITY.ICONS.MEDIUM;
}

export function contentAnnouncementPriorityGetBadge(
  level: ContentAnnouncementPriorityLevel
): ContentAnnouncementPriorityBadge {
  const badgeMap: Record<ContentAnnouncementPriorityLevel, ContentAnnouncementPriorityBadge> = {
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.LOW]: CONTENT_ANNOUNCEMENT_PRIORITY.BADGES.LOW,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.MEDIUM]: CONTENT_ANNOUNCEMENT_PRIORITY.BADGES.MEDIUM,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.HIGH]: CONTENT_ANNOUNCEMENT_PRIORITY.BADGES.HIGH,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.CRITICAL]: CONTENT_ANNOUNCEMENT_PRIORITY.BADGES.CRITICAL,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.EMERGENCY]:
      CONTENT_ANNOUNCEMENT_PRIORITY.BADGES.EMERGENCY,
  };
  return badgeMap[level] || CONTENT_ANNOUNCEMENT_PRIORITY.BADGES.MEDIUM;
}

export function contentAnnouncementPriorityGetTimeout(
  level: ContentAnnouncementPriorityLevel
): ContentAnnouncementPriorityTimeout {
  const timeoutMap: Record<ContentAnnouncementPriorityLevel, ContentAnnouncementPriorityTimeout> = {
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.LOW]: CONTENT_ANNOUNCEMENT_PRIORITY.TIMEFRAMES.LOW,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.MEDIUM]: CONTENT_ANNOUNCEMENT_PRIORITY.TIMEFRAMES.MEDIUM,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.HIGH]: CONTENT_ANNOUNCEMENT_PRIORITY.TIMEFRAMES.HIGH,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.CRITICAL]:
      CONTENT_ANNOUNCEMENT_PRIORITY.TIMEFRAMES.CRITICAL,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.EMERGENCY]:
      CONTENT_ANNOUNCEMENT_PRIORITY.TIMEFRAMES.EMERGENCY,
  };
  return timeoutMap[level] || CONTENT_ANNOUNCEMENT_PRIORITY.TIMEFRAMES.MEDIUM;
}

export function contentAnnouncementPriorityGetEscalation(
  level: ContentAnnouncementPriorityLevel
): ContentAnnouncementPriorityEscalation {
  const escalationMap: Record<
    ContentAnnouncementPriorityLevel,
    ContentAnnouncementPriorityEscalation
  > = {
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.LOW]: CONTENT_ANNOUNCEMENT_PRIORITY.ESCALATION.LOW,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.MEDIUM]: CONTENT_ANNOUNCEMENT_PRIORITY.ESCALATION.MEDIUM,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.HIGH]: CONTENT_ANNOUNCEMENT_PRIORITY.ESCALATION.HIGH,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.CRITICAL]:
      CONTENT_ANNOUNCEMENT_PRIORITY.ESCALATION.CRITICAL,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.EMERGENCY]:
      CONTENT_ANNOUNCEMENT_PRIORITY.ESCALATION.EMERGENCY,
  };
  return escalationMap[level] || CONTENT_ANNOUNCEMENT_PRIORITY.ESCALATION.MEDIUM;
}

export function contentAnnouncementPriorityGetResponseTime(
  level: ContentAnnouncementPriorityLevel
): ContentAnnouncementPriorityResponseTime {
  const responseMap: Record<
    ContentAnnouncementPriorityLevel,
    ContentAnnouncementPriorityResponseTime
  > = {
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.LOW]: CONTENT_ANNOUNCEMENT_PRIORITY.RESPONSE_TIMES.LOW,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.MEDIUM]:
      CONTENT_ANNOUNCEMENT_PRIORITY.RESPONSE_TIMES.MEDIUM,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.HIGH]: CONTENT_ANNOUNCEMENT_PRIORITY.RESPONSE_TIMES.HIGH,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.CRITICAL]:
      CONTENT_ANNOUNCEMENT_PRIORITY.RESPONSE_TIMES.CRITICAL,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.EMERGENCY]:
      CONTENT_ANNOUNCEMENT_PRIORITY.RESPONSE_TIMES.EMERGENCY,
  };
  return responseMap[level] || CONTENT_ANNOUNCEMENT_PRIORITY.RESPONSE_TIMES.MEDIUM;
}

export function contentAnnouncementPriorityGetResolutionTime(
  level: ContentAnnouncementPriorityLevel
): ContentAnnouncementPriorityResolutionTime {
  const resolutionMap: Record<
    ContentAnnouncementPriorityLevel,
    ContentAnnouncementPriorityResolutionTime
  > = {
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.LOW]: CONTENT_ANNOUNCEMENT_PRIORITY.RESOLUTION_TIMES.LOW,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.MEDIUM]:
      CONTENT_ANNOUNCEMENT_PRIORITY.RESOLUTION_TIMES.MEDIUM,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.HIGH]:
      CONTENT_ANNOUNCEMENT_PRIORITY.RESOLUTION_TIMES.HIGH,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.CRITICAL]:
      CONTENT_ANNOUNCEMENT_PRIORITY.RESOLUTION_TIMES.CRITICAL,
    [CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.EMERGENCY]:
      CONTENT_ANNOUNCEMENT_PRIORITY.RESOLUTION_TIMES.EMERGENCY,
  };
  return resolutionMap[level] || CONTENT_ANNOUNCEMENT_PRIORITY.RESOLUTION_TIMES.MEDIUM;
}

export function contentAnnouncementPriorityIsValidLevel(
  level: string
): level is ContentAnnouncementPriorityLevel {
  return Object.values(CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS).includes(
    level as ContentAnnouncementPriorityLevel
  );
}

export function contentAnnouncementPriorityGetLevelFromScore(
  score: number
): ContentAnnouncementPriorityLevel {
  if (score >= CONTENT_ANNOUNCEMENT_PRIORITY.SCORES.EMERGENCY) {
    return CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.EMERGENCY;
  }
  if (score >= CONTENT_ANNOUNCEMENT_PRIORITY.SCORES.CRITICAL) {
    return CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.CRITICAL;
  }
  if (score >= CONTENT_ANNOUNCEMENT_PRIORITY.SCORES.HIGH) {
    return CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.HIGH;
  }
  if (score >= CONTENT_ANNOUNCEMENT_PRIORITY.SCORES.MEDIUM) {
    return CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.MEDIUM;
  }
  return CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.LOW;
}

export function contentAnnouncementPriorityGetPriorityForUrgency(
  urgency: 'low' | 'medium' | 'high' | 'urgent' | 'emergency'
): ContentAnnouncementPriorityLevel {
  const urgencyMap: Record<
    'low' | 'medium' | 'high' | 'urgent' | 'emergency',
    ContentAnnouncementPriorityLevel
  > = {
    low: CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.LOW,
    medium: CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.MEDIUM,
    high: CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.HIGH,
    urgent: CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.CRITICAL,
    emergency: CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.EMERGENCY,
  };
  return urgencyMap[urgency] || CONTENT_ANNOUNCEMENT_PRIORITY.LEVELS.MEDIUM;
}
