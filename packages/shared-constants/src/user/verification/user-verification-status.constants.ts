/**
 * User Verification Status Constants
 * Defines all possible user verification statuses
 */

export const USER_VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  FAILED: 'failed',
} as const;

export type UserVerificationStatus =
  (typeof USER_VERIFICATION_STATUS)[keyof typeof USER_VERIFICATION_STATUS];

export const USER_VERIFICATION_STATUS_LABELS: Record<UserVerificationStatus, string> = {
  [USER_VERIFICATION_STATUS.PENDING]: 'Pending',
  [USER_VERIFICATION_STATUS.VERIFIED]: 'Verified',
  [USER_VERIFICATION_STATUS.REJECTED]: 'Rejected',
  [USER_VERIFICATION_STATUS.EXPIRED]: 'Expired',
  [USER_VERIFICATION_STATUS.REVOKED]: 'Revoked',
  [USER_VERIFICATION_STATUS.FAILED]: 'Failed',
};

export const USER_VERIFICATION_STATUS_COLORS: Record<UserVerificationStatus, string> = {
  [USER_VERIFICATION_STATUS.PENDING]: 'warning',
  [USER_VERIFICATION_STATUS.VERIFIED]: 'success',
  [USER_VERIFICATION_STATUS.REJECTED]: 'danger',
  [USER_VERIFICATION_STATUS.EXPIRED]: 'secondary',
  [USER_VERIFICATION_STATUS.REVOKED]: 'danger',
  [USER_VERIFICATION_STATUS.FAILED]: 'danger',
};

export const ACTIVE_VERIFICATION_STATUSES: UserVerificationStatus[] = [
  USER_VERIFICATION_STATUS.PENDING,
];

export const COMPLETED_VERIFICATION_STATUSES: UserVerificationStatus[] = [
  USER_VERIFICATION_STATUS.VERIFIED,
];

export const FAILED_VERIFICATION_STATUSES: UserVerificationStatus[] = [
  USER_VERIFICATION_STATUS.REJECTED,
  USER_VERIFICATION_STATUS.EXPIRED,
  USER_VERIFICATION_STATUS.REVOKED,
  USER_VERIFICATION_STATUS.FAILED,
];

export const VALID_VERIFICATION_STATUSES: UserVerificationStatus[] = [
  USER_VERIFICATION_STATUS.PENDING,
  USER_VERIFICATION_STATUS.VERIFIED,
];

export function isVerificationPending(status: UserVerificationStatus): boolean {
  return status === USER_VERIFICATION_STATUS.PENDING;
}

export function isVerificationVerified(status: UserVerificationStatus): boolean {
  return status === USER_VERIFICATION_STATUS.VERIFIED;
}

export function isVerificationFailed(status: UserVerificationStatus): boolean {
  return FAILED_VERIFICATION_STATUSES.includes(status);
}

export function isVerificationComplete(status: UserVerificationStatus): boolean {
  return (
    status === USER_VERIFICATION_STATUS.VERIFIED ||
    status === USER_VERIFICATION_STATUS.REJECTED ||
    status === USER_VERIFICATION_STATUS.EXPIRED ||
    status === USER_VERIFICATION_STATUS.REVOKED
  );
}

export function canRetryVerification(status: UserVerificationStatus): boolean {
  return (
    status === USER_VERIFICATION_STATUS.PENDING ||
    status === USER_VERIFICATION_STATUS.FAILED ||
    status === USER_VERIFICATION_STATUS.EXPIRED
  );
}

export function getVerificationStatusLabel(status: UserVerificationStatus): string {
  return USER_VERIFICATION_STATUS_LABELS[status] || 'Unknown';
}

export function getVerificationStatusColor(status: UserVerificationStatus): string {
  return USER_VERIFICATION_STATUS_COLORS[status] || 'secondary';
}
