export const COMPLAINT_TYPE = {
  PRODUCT_QUALITY: 'product_quality',
  SERVICE_QUALITY: 'service_quality',
  DELIVERY: 'delivery',
  BILLING: 'billing',
  STAFF_BEHAVIOR: 'staff_behavior',
  POLICY: 'policy',
  REFUND: 'refund',
  FRAUD: 'fraud',
  OTHER: 'other',
} as const;

export const COMPLAINT_STATUS = {
  RECEIVED: 'received',
  ACKNOWLEDGED: 'acknowledged',
  INVESTIGATING: 'investigating',
  ESCALATED: 'escalated',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  CLOSED: 'closed',
  ARCHIVED: 'archived',
} as const;

export const COMPLAINT_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export const COMPLAINT = {
  TYPE: COMPLAINT_TYPE,
  STATUS: COMPLAINT_STATUS,
  SEVERITY: COMPLAINT_SEVERITY,
  SUBJECT_MAX_LENGTH: 200,
  DESCRIPTION_MIN_LENGTH: 20,
  DESCRIPTION_MAX_LENGTH: 10000,
  MAX_ATTACHMENTS: 10,
  MAX_ATTACHMENT_SIZE_MB: 25,
  ACKNOWLEDGE_HOURS: 24,
  RESOLUTION_DAYS: 7,
  ESCALATION_HOURS: 48,
  REOPEN_WINDOW_DAYS: 30,
  RETENTION_DAYS: 1095,
} as const;

export type ComplaintTypeType = (typeof COMPLAINT_TYPE)[keyof typeof COMPLAINT_TYPE];
export type ComplaintStatusType = (typeof COMPLAINT_STATUS)[keyof typeof COMPLAINT_STATUS];
export type ComplaintSeverityType = (typeof COMPLAINT_SEVERITY)[keyof typeof COMPLAINT_SEVERITY];
