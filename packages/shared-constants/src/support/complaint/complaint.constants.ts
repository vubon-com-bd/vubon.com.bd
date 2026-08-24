/**
 * Complaint Constants
 * Configuration for customer complaints
 */

export const COMPLAINT = {
  // Complaint Types
  TYPES: {
    PRODUCT: 'product',
    SERVICE: 'service',
    DELIVERY: 'delivery',
    PAYMENT: 'payment',
    BILLING: 'billing',
    ACCOUNT: 'account',
    TECHNICAL: 'technical',
    STAFF: 'staff',
    POLICY: 'policy',
    GENERAL: 'general',
  } as const,

  // Complaint Statuses
  STATUS: {
    PENDING: 'pending',
    REVIEW: 'review',
    INVESTIGATING: 'investigating',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
    REJECTED: 'rejected',
    ESCALATED: 'escalated',
    ARCHIVED: 'archived',
  } as const,

  // Complaint Severities
  SEVERITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    MINOR: 'minor',
  } as const,

  // Complaint Channels
  CHANNELS: {
    EMAIL: 'email',
    PHONE: 'phone',
    CHAT: 'chat',
    SOCIAL: 'social',
    WEBSITE: 'website',
    APP: 'app',
    LETTER: 'letter',
    IN_PERSON: 'in_person',
  } as const,

  // Complaint Resolution Times (in hours)
  RESOLUTION_TIMES: {
    CRITICAL: 4,
    HIGH: 8,
    MEDIUM: 24,
    LOW: 48,
    MINOR: 72,
  } as const,

  // Complaint Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 1000,
    MAX_ATTACHMENTS: 5,
    MAX_ESCALATIONS: 3,
  } as const,
} as const;

// Complaint Types
export type ComplaintType = (typeof COMPLAINT.TYPES)[keyof typeof COMPLAINT.TYPES];

// Complaint Statuses
export type ComplaintStatus = (typeof COMPLAINT.STATUS)[keyof typeof COMPLAINT.STATUS];

// Complaint Severities
export type ComplaintSeverity = (typeof COMPLAINT.SEVERITY)[keyof typeof COMPLAINT.SEVERITY];

// Complaint Channels
export type ComplaintChannel = (typeof COMPLAINT.CHANNELS)[keyof typeof COMPLAINT.CHANNELS];

// Utility Functions
export function complaintGetTypeLabel(type: ComplaintType): string {
  const labels: Record<ComplaintType, string> = {
    [COMPLAINT.TYPES.PRODUCT]: 'Product',
    [COMPLAINT.TYPES.SERVICE]: 'Service',
    [COMPLAINT.TYPES.DELIVERY]: 'Delivery',
    [COMPLAINT.TYPES.PAYMENT]: 'Payment',
    [COMPLAINT.TYPES.BILLING]: 'Billing',
    [COMPLAINT.TYPES.ACCOUNT]: 'Account',
    [COMPLAINT.TYPES.TECHNICAL]: 'Technical',
    [COMPLAINT.TYPES.STAFF]: 'Staff',
    [COMPLAINT.TYPES.POLICY]: 'Policy',
    [COMPLAINT.TYPES.GENERAL]: 'General',
  };
  return labels[type] || 'Unknown';
}

export function complaintGetStatusLabel(status: ComplaintStatus): string {
  const labels: Record<ComplaintStatus, string> = {
    [COMPLAINT.STATUS.PENDING]: 'Pending',
    [COMPLAINT.STATUS.REVIEW]: 'In Review',
    [COMPLAINT.STATUS.INVESTIGATING]: 'Investigating',
    [COMPLAINT.STATUS.RESOLVED]: 'Resolved',
    [COMPLAINT.STATUS.CLOSED]: 'Closed',
    [COMPLAINT.STATUS.REJECTED]: 'Rejected',
    [COMPLAINT.STATUS.ESCALATED]: 'Escalated',
    [COMPLAINT.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function complaintGetSeverityLabel(severity: ComplaintSeverity): string {
  const labels: Record<ComplaintSeverity, string> = {
    [COMPLAINT.SEVERITY.CRITICAL]: 'Critical',
    [COMPLAINT.SEVERITY.HIGH]: 'High',
    [COMPLAINT.SEVERITY.MEDIUM]: 'Medium',
    [COMPLAINT.SEVERITY.LOW]: 'Low',
    [COMPLAINT.SEVERITY.MINOR]: 'Minor',
  };
  return labels[severity] || 'Unknown';
}

export function complaintGetResolutionTime(severity: ComplaintSeverity): number {
  const times: Record<ComplaintSeverity, number> = {
    [COMPLAINT.SEVERITY.CRITICAL]: COMPLAINT.RESOLUTION_TIMES.CRITICAL,
    [COMPLAINT.SEVERITY.HIGH]: COMPLAINT.RESOLUTION_TIMES.HIGH,
    [COMPLAINT.SEVERITY.MEDIUM]: COMPLAINT.RESOLUTION_TIMES.MEDIUM,
    [COMPLAINT.SEVERITY.LOW]: COMPLAINT.RESOLUTION_TIMES.LOW,
    [COMPLAINT.SEVERITY.MINOR]: COMPLAINT.RESOLUTION_TIMES.MINOR,
  };
  return times[severity] || COMPLAINT.RESOLUTION_TIMES.MEDIUM;
}

export function complaintIsResolved(status: ComplaintStatus): boolean {
  return status === COMPLAINT.STATUS.RESOLVED || status === COMPLAINT.STATUS.CLOSED;
}

export function complaintIsPending(status: ComplaintStatus): boolean {
  return (
    status === COMPLAINT.STATUS.PENDING ||
    status === COMPLAINT.STATUS.REVIEW ||
    status === COMPLAINT.STATUS.INVESTIGATING
  );
}

export function complaintCanEscalate(status: ComplaintStatus): boolean {
  const escalatableStatuses: ComplaintStatus[] = [
    COMPLAINT.STATUS.PENDING,
    COMPLAINT.STATUS.REVIEW,
    COMPLAINT.STATUS.INVESTIGATING,
  ];
  return escalatableStatuses.includes(status);
}

export function complaintGetChannelLabel(channel: ComplaintChannel): string {
  const labels: Record<ComplaintChannel, string> = {
    [COMPLAINT.CHANNELS.EMAIL]: 'Email',
    [COMPLAINT.CHANNELS.PHONE]: 'Phone',
    [COMPLAINT.CHANNELS.CHAT]: 'Chat',
    [COMPLAINT.CHANNELS.SOCIAL]: 'Social Media',
    [COMPLAINT.CHANNELS.WEBSITE]: 'Website',
    [COMPLAINT.CHANNELS.APP]: 'Mobile App',
    [COMPLAINT.CHANNELS.LETTER]: 'Letter',
    [COMPLAINT.CHANNELS.IN_PERSON]: 'In Person',
  };
  return labels[channel] || 'Unknown';
}
