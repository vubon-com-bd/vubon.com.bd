/**
 * Vendor Ticket Priority Constants
 * Priority definitions for vendor tickets
 */

export const VENDOR_TICKET_PRIORITY = {
  // Priority Types
  TYPES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Priority Levels (numeric)
  LEVELS: {
    CRITICAL: 4,
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
  } as const,

  // Priority Colors (for UI)
  COLORS: {
    CRITICAL: '#red-600',
    HIGH: '#orange-500',
    MEDIUM: '#yellow-500',
    LOW: '#blue-400',
  } as const,

  // Priority Icons (for UI)
  ICONS: {
    CRITICAL: '🚨',
    HIGH: '⚠️',
    MEDIUM: '📌',
    LOW: 'ℹ️',
  } as const,

  // Response Times (in minutes)
  RESPONSE_TIMES: {
    CRITICAL: 60,
    HIGH: 240,
    MEDIUM: 480,
    LOW: 1440,
  } as const,

  // Resolution Times (in hours)
  RESOLUTION_TIMES: {
    CRITICAL: 4,
    HIGH: 8,
    MEDIUM: 24,
    LOW: 48,
  } as const,

  // Escalation Times (in minutes)
  ESCALATION_TIMES: {
    CRITICAL: 30,
    HIGH: 120,
    MEDIUM: 360,
    LOW: 720,
  } as const,
} as const;

// Priority Types
export type VendorTicketPriorityType =
  (typeof VENDOR_TICKET_PRIORITY.TYPES)[keyof typeof VENDOR_TICKET_PRIORITY.TYPES];

// Priority Levels
export type VendorTicketPriorityLevel =
  (typeof VENDOR_TICKET_PRIORITY.LEVELS)[keyof typeof VENDOR_TICKET_PRIORITY.LEVELS];

// Priority Colors
export type VendorTicketPriorityColor =
  (typeof VENDOR_TICKET_PRIORITY.COLORS)[keyof typeof VENDOR_TICKET_PRIORITY.COLORS];

// Priority Icons
export type VendorTicketPriorityIcon =
  (typeof VENDOR_TICKET_PRIORITY.ICONS)[keyof typeof VENDOR_TICKET_PRIORITY.ICONS];

// Utility Functions
export function vendorTicketPriorityGetLabel(priority: VendorTicketPriorityType): string {
  const labels: Record<VendorTicketPriorityType, string> = {
    [VENDOR_TICKET_PRIORITY.TYPES.CRITICAL]: 'Critical',
    [VENDOR_TICKET_PRIORITY.TYPES.HIGH]: 'High',
    [VENDOR_TICKET_PRIORITY.TYPES.MEDIUM]: 'Medium',
    [VENDOR_TICKET_PRIORITY.TYPES.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function vendorTicketPriorityGetLevel(priority: VendorTicketPriorityType): number {
  const levels: Record<VendorTicketPriorityType, number> = {
    [VENDOR_TICKET_PRIORITY.TYPES.CRITICAL]: VENDOR_TICKET_PRIORITY.LEVELS.CRITICAL,
    [VENDOR_TICKET_PRIORITY.TYPES.HIGH]: VENDOR_TICKET_PRIORITY.LEVELS.HIGH,
    [VENDOR_TICKET_PRIORITY.TYPES.MEDIUM]: VENDOR_TICKET_PRIORITY.LEVELS.MEDIUM,
    [VENDOR_TICKET_PRIORITY.TYPES.LOW]: VENDOR_TICKET_PRIORITY.LEVELS.LOW,
  };
  return levels[priority] || 2;
}

export function vendorTicketPriorityGetColor(
  priority: VendorTicketPriorityType
): VendorTicketPriorityColor {
  const colors: Record<VendorTicketPriorityType, VendorTicketPriorityColor> = {
    [VENDOR_TICKET_PRIORITY.TYPES.CRITICAL]: VENDOR_TICKET_PRIORITY.COLORS.CRITICAL,
    [VENDOR_TICKET_PRIORITY.TYPES.HIGH]: VENDOR_TICKET_PRIORITY.COLORS.HIGH,
    [VENDOR_TICKET_PRIORITY.TYPES.MEDIUM]: VENDOR_TICKET_PRIORITY.COLORS.MEDIUM,
    [VENDOR_TICKET_PRIORITY.TYPES.LOW]: VENDOR_TICKET_PRIORITY.COLORS.LOW,
  };
  return colors[priority] || '#gray-400';
}

export function vendorTicketPriorityGetResponseTime(priority: VendorTicketPriorityType): number {
  const times: Record<VendorTicketPriorityType, number> = {
    [VENDOR_TICKET_PRIORITY.TYPES.CRITICAL]: VENDOR_TICKET_PRIORITY.RESPONSE_TIMES.CRITICAL,
    [VENDOR_TICKET_PRIORITY.TYPES.HIGH]: VENDOR_TICKET_PRIORITY.RESPONSE_TIMES.HIGH,
    [VENDOR_TICKET_PRIORITY.TYPES.MEDIUM]: VENDOR_TICKET_PRIORITY.RESPONSE_TIMES.MEDIUM,
    [VENDOR_TICKET_PRIORITY.TYPES.LOW]: VENDOR_TICKET_PRIORITY.RESPONSE_TIMES.LOW,
  };
  return times[priority] || 480;
}

export function vendorTicketPriorityGetResolutionTime(priority: VendorTicketPriorityType): number {
  const times: Record<VendorTicketPriorityType, number> = {
    [VENDOR_TICKET_PRIORITY.TYPES.CRITICAL]: VENDOR_TICKET_PRIORITY.RESOLUTION_TIMES.CRITICAL,
    [VENDOR_TICKET_PRIORITY.TYPES.HIGH]: VENDOR_TICKET_PRIORITY.RESOLUTION_TIMES.HIGH,
    [VENDOR_TICKET_PRIORITY.TYPES.MEDIUM]: VENDOR_TICKET_PRIORITY.RESOLUTION_TIMES.MEDIUM,
    [VENDOR_TICKET_PRIORITY.TYPES.LOW]: VENDOR_TICKET_PRIORITY.RESOLUTION_TIMES.LOW,
  };
  return times[priority] || 24;
}

export function vendorTicketPriorityGetEscalationTime(priority: VendorTicketPriorityType): number {
  const times: Record<VendorTicketPriorityType, number> = {
    [VENDOR_TICKET_PRIORITY.TYPES.CRITICAL]: VENDOR_TICKET_PRIORITY.ESCALATION_TIMES.CRITICAL,
    [VENDOR_TICKET_PRIORITY.TYPES.HIGH]: VENDOR_TICKET_PRIORITY.ESCALATION_TIMES.HIGH,
    [VENDOR_TICKET_PRIORITY.TYPES.MEDIUM]: VENDOR_TICKET_PRIORITY.ESCALATION_TIMES.MEDIUM,
    [VENDOR_TICKET_PRIORITY.TYPES.LOW]: VENDOR_TICKET_PRIORITY.ESCALATION_TIMES.LOW,
  };
  return times[priority] || 360;
}
