/**
 * Complaint Severity Constants
 * Severity levels for complaints
 */

export const COMPLAINT_SEVERITY = {
  // Severity Types
  TYPES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    MINOR: 'minor',
  } as const,

  // Severity Levels (numeric)
  LEVELS: {
    CRITICAL: 5,
    HIGH: 4,
    MEDIUM: 3,
    LOW: 2,
    MINOR: 1,
  } as const,

  // Severity Colors (for UI)
  COLORS: {
    CRITICAL: '#red-600',
    HIGH: '#orange-500',
    MEDIUM: '#yellow-500',
    LOW: '#blue-400',
    MINOR: '#gray-400',
  } as const,

  // Severity Icons (for UI)
  ICONS: {
    CRITICAL: '🚨',
    HIGH: '⚠️',
    MEDIUM: '📌',
    LOW: 'ℹ️',
    MINOR: '📝',
  } as const,

  // Escalation Levels
  ESCALATION_LEVELS: {
    CRITICAL: 5,
    HIGH: 4,
    MEDIUM: 3,
    LOW: 2,
    MINOR: 1,
  } as const,

  // Response Times (in minutes)
  RESPONSE_TIMES: {
    CRITICAL: 15,
    HIGH: 30,
    MEDIUM: 60,
    LOW: 120,
    MINOR: 240,
  } as const,
} as const;

// Severity Types
export type ComplaintSeverityType =
  (typeof COMPLAINT_SEVERITY.TYPES)[keyof typeof COMPLAINT_SEVERITY.TYPES];

// Severity Levels
export type ComplaintSeverityLevel =
  (typeof COMPLAINT_SEVERITY.LEVELS)[keyof typeof COMPLAINT_SEVERITY.LEVELS];

// Severity Colors
export type ComplaintSeverityColor =
  (typeof COMPLAINT_SEVERITY.COLORS)[keyof typeof COMPLAINT_SEVERITY.COLORS];

// Severity Icons
export type ComplaintSeverityIcon =
  (typeof COMPLAINT_SEVERITY.ICONS)[keyof typeof COMPLAINT_SEVERITY.ICONS];

// Utility Functions
export function complaintSeverityGetLabel(severity: ComplaintSeverityType): string {
  const labels: Record<ComplaintSeverityType, string> = {
    [COMPLAINT_SEVERITY.TYPES.CRITICAL]: 'Critical',
    [COMPLAINT_SEVERITY.TYPES.HIGH]: 'High',
    [COMPLAINT_SEVERITY.TYPES.MEDIUM]: 'Medium',
    [COMPLAINT_SEVERITY.TYPES.LOW]: 'Low',
    [COMPLAINT_SEVERITY.TYPES.MINOR]: 'Minor',
  };
  return labels[severity] || 'Unknown';
}

export function complaintSeverityGetLevel(severity: ComplaintSeverityType): number {
  const levels: Record<ComplaintSeverityType, number> = {
    [COMPLAINT_SEVERITY.TYPES.CRITICAL]: COMPLAINT_SEVERITY.LEVELS.CRITICAL,
    [COMPLAINT_SEVERITY.TYPES.HIGH]: COMPLAINT_SEVERITY.LEVELS.HIGH,
    [COMPLAINT_SEVERITY.TYPES.MEDIUM]: COMPLAINT_SEVERITY.LEVELS.MEDIUM,
    [COMPLAINT_SEVERITY.TYPES.LOW]: COMPLAINT_SEVERITY.LEVELS.LOW,
    [COMPLAINT_SEVERITY.TYPES.MINOR]: COMPLAINT_SEVERITY.LEVELS.MINOR,
  };
  return levels[severity] || 3;
}

export function complaintSeverityGetColor(severity: ComplaintSeverityType): ComplaintSeverityColor {
  const colors: Record<ComplaintSeverityType, ComplaintSeverityColor> = {
    [COMPLAINT_SEVERITY.TYPES.CRITICAL]: COMPLAINT_SEVERITY.COLORS.CRITICAL,
    [COMPLAINT_SEVERITY.TYPES.HIGH]: COMPLAINT_SEVERITY.COLORS.HIGH,
    [COMPLAINT_SEVERITY.TYPES.MEDIUM]: COMPLAINT_SEVERITY.COLORS.MEDIUM,
    [COMPLAINT_SEVERITY.TYPES.LOW]: COMPLAINT_SEVERITY.COLORS.LOW,
    [COMPLAINT_SEVERITY.TYPES.MINOR]: COMPLAINT_SEVERITY.COLORS.MINOR,
  };
  return colors[severity] || '#gray-400';
}

export function complaintSeverityGetIcon(severity: ComplaintSeverityType): ComplaintSeverityIcon {
  const icons: Record<ComplaintSeverityType, ComplaintSeverityIcon> = {
    [COMPLAINT_SEVERITY.TYPES.CRITICAL]: COMPLAINT_SEVERITY.ICONS.CRITICAL,
    [COMPLAINT_SEVERITY.TYPES.HIGH]: COMPLAINT_SEVERITY.ICONS.HIGH,
    [COMPLAINT_SEVERITY.TYPES.MEDIUM]: COMPLAINT_SEVERITY.ICONS.MEDIUM,
    [COMPLAINT_SEVERITY.TYPES.LOW]: COMPLAINT_SEVERITY.ICONS.LOW,
    [COMPLAINT_SEVERITY.TYPES.MINOR]: COMPLAINT_SEVERITY.ICONS.MINOR,
  };
  return icons[severity] || '📌';
}

export function complaintSeverityGetEscalationLevel(severity: ComplaintSeverityType): number {
  const levels: Record<ComplaintSeverityType, number> = {
    [COMPLAINT_SEVERITY.TYPES.CRITICAL]: COMPLAINT_SEVERITY.ESCALATION_LEVELS.CRITICAL,
    [COMPLAINT_SEVERITY.TYPES.HIGH]: COMPLAINT_SEVERITY.ESCALATION_LEVELS.HIGH,
    [COMPLAINT_SEVERITY.TYPES.MEDIUM]: COMPLAINT_SEVERITY.ESCALATION_LEVELS.MEDIUM,
    [COMPLAINT_SEVERITY.TYPES.LOW]: COMPLAINT_SEVERITY.ESCALATION_LEVELS.LOW,
    [COMPLAINT_SEVERITY.TYPES.MINOR]: COMPLAINT_SEVERITY.ESCALATION_LEVELS.MINOR,
  };
  return levels[severity] || 3;
}

export function complaintSeverityGetResponseTime(severity: ComplaintSeverityType): number {
  const times: Record<ComplaintSeverityType, number> = {
    [COMPLAINT_SEVERITY.TYPES.CRITICAL]: COMPLAINT_SEVERITY.RESPONSE_TIMES.CRITICAL,
    [COMPLAINT_SEVERITY.TYPES.HIGH]: COMPLAINT_SEVERITY.RESPONSE_TIMES.HIGH,
    [COMPLAINT_SEVERITY.TYPES.MEDIUM]: COMPLAINT_SEVERITY.RESPONSE_TIMES.MEDIUM,
    [COMPLAINT_SEVERITY.TYPES.LOW]: COMPLAINT_SEVERITY.RESPONSE_TIMES.LOW,
    [COMPLAINT_SEVERITY.TYPES.MINOR]: COMPLAINT_SEVERITY.RESPONSE_TIMES.MINOR,
  };
  return times[severity] || 60;
}

export function complaintSeverityIsUrgent(severity: ComplaintSeverityType): boolean {
  return (
    severity === COMPLAINT_SEVERITY.TYPES.CRITICAL || severity === COMPLAINT_SEVERITY.TYPES.HIGH
  );
}
