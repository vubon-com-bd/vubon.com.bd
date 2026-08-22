/**
 * User KYC Status Constants
 * Defines all possible user KYC statuses
 */

export const USER_KYC_STATUS = {
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  REVIEWING: 'reviewing',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
} as const;

export type UserKYCStatus = (typeof USER_KYC_STATUS)[keyof typeof USER_KYC_STATUS];

export const USER_KYC_STATUS_LABELS: Record<UserKYCStatus, string> = {
  [USER_KYC_STATUS.PENDING]: 'Pending',
  [USER_KYC_STATUS.SUBMITTED]: 'Submitted',
  [USER_KYC_STATUS.REVIEWING]: 'Under Review',
  [USER_KYC_STATUS.VERIFIED]: 'Verified',
  [USER_KYC_STATUS.REJECTED]: 'Rejected',
  [USER_KYC_STATUS.EXPIRED]: 'Expired',
  [USER_KYC_STATUS.REVOKED]: 'Revoked',
};

export const USER_KYC_STATUS_COLORS: Record<UserKYCStatus, string> = {
  [USER_KYC_STATUS.PENDING]: 'warning',
  [USER_KYC_STATUS.SUBMITTED]: 'info',
  [USER_KYC_STATUS.REVIEWING]: 'primary',
  [USER_KYC_STATUS.VERIFIED]: 'success',
  [USER_KYC_STATUS.REJECTED]: 'danger',
  [USER_KYC_STATUS.EXPIRED]: 'secondary',
  [USER_KYC_STATUS.REVOKED]: 'danger',
};

export const PENDING_KYC_STATUSES: UserKYCStatus[] = [
  USER_KYC_STATUS.PENDING,
  USER_KYC_STATUS.SUBMITTED,
  USER_KYC_STATUS.REVIEWING,
];

export const COMPLETED_KYC_STATUSES: UserKYCStatus[] = [USER_KYC_STATUS.VERIFIED];

export const FAILED_KYC_STATUSES: UserKYCStatus[] = [
  USER_KYC_STATUS.REJECTED,
  USER_KYC_STATUS.EXPIRED,
  USER_KYC_STATUS.REVOKED,
];

export const ACTIONABLE_KYC_STATUSES: UserKYCStatus[] = [
  USER_KYC_STATUS.PENDING,
  USER_KYC_STATUS.REJECTED,
  USER_KYC_STATUS.EXPIRED,
];

export const VERIFIED_KYC_STATUSES: UserKYCStatus[] = [USER_KYC_STATUS.VERIFIED];

export function isKYCPending(status: UserKYCStatus): boolean {
  return PENDING_KYC_STATUSES.includes(status);
}

export function isKYCVerified(status: UserKYCStatus): boolean {
  return status === USER_KYC_STATUS.VERIFIED;
}

export function isKYCFailed(status: UserKYCStatus): boolean {
  return FAILED_KYC_STATUSES.includes(status);
}

export function isKYCComplete(status: UserKYCStatus): boolean {
  return (
    status === USER_KYC_STATUS.VERIFIED ||
    status === USER_KYC_STATUS.REJECTED ||
    status === USER_KYC_STATUS.EXPIRED ||
    status === USER_KYC_STATUS.REVOKED
  );
}

export function canSubmitKYC(status: UserKYCStatus): boolean {
  return (
    status === USER_KYC_STATUS.PENDING ||
    status === USER_KYC_STATUS.REJECTED ||
    status === USER_KYC_STATUS.EXPIRED
  );
}

export function isKYCUnderReview(status: UserKYCStatus): boolean {
  return status === USER_KYC_STATUS.REVIEWING;
}

export function getKYCStatusLabel(status: UserKYCStatus): string {
  return USER_KYC_STATUS_LABELS[status] || 'Unknown';
}

export function getKYCStatusColor(status: UserKYCStatus): string {
  return USER_KYC_STATUS_COLORS[status] || 'secondary';
}
