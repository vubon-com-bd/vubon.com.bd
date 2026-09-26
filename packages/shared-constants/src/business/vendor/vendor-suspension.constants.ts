export const VENDOR_SUSPENSION_REASON = {
  POLICY_VIOLATION: 'policy_violation',
  FRAUD: 'fraud',
  NON_PAYMENT: 'non_payment',
  POOR_PERFORMANCE: 'poor_performance',
  CUSTOMER_COMPLAINTS: 'customer_complaints',
  DOCUMENT_EXPIRED: 'document_expired',
  INAPPROPRIATE_CONTENT: 'inappropriate_content',
  OTHER: 'other',
} as const;

export const VENDOR_SUSPENSION_STATUS = {
  ACTIVE: 'active',
  LIFTED: 'lifted',
  EXPIRED: 'expired',
  UNDER_APPEAL: 'under_appeal',
} as const;

export const VENDOR_SUSPENSION = {
  DEFAULT_DURATION_DAYS: 30,
  MAX_DURATION_DAYS: 365,
  APPEAL_WINDOW_DAYS: 14,
  AUTO_LIFT_ON_RESOLUTION: true,
} as const;

export type VendorSuspensionReasonType =
  (typeof VENDOR_SUSPENSION_REASON)[keyof typeof VENDOR_SUSPENSION_REASON];

export type VendorSuspensionStatusType =
  (typeof VENDOR_SUSPENSION_STATUS)[keyof typeof VENDOR_SUSPENSION_STATUS];
