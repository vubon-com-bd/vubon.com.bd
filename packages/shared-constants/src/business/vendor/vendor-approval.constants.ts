export const VENDOR_APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  INFO_REQUESTED: 'info_requested',
  UNDER_APPEAL: 'under_appeal',
} as const;

export const VENDOR_APPROVAL_REASON = {
  COMPLETE: 'complete',
  INCOMPLETE_DOCUMENTS: 'incomplete_documents',
  INVALID_DOCUMENTS: 'invalid_documents',
  POLICY_VIOLATION: 'policy_violation',
  FRAUD_SUSPECTED: 'fraud_suspected',
  DUPLICATE_ACCOUNT: 'duplicate_account',
  OTHER: 'other',
} as const;

export const VENDOR_APPROVAL = {
  AUTO_APPROVE_THRESHOLD: 90,
  REVIEW_SLA_HOURS: 48,
  MAX_RESUBMISSIONS: 3,
  APPEAL_WINDOW_DAYS: 30,
} as const;

export type VendorApprovalStatusType =
  (typeof VENDOR_APPROVAL_STATUS)[keyof typeof VENDOR_APPROVAL_STATUS];

export type VendorApprovalReasonType =
  (typeof VENDOR_APPROVAL_REASON)[keyof typeof VENDOR_APPROVAL_REASON];
