/**
 * User KYC Constants
 * @module shared-constants/user/user-kyc
 *
 * Note: Does NOT spread COMMON_TYPES (primitives like STRING/NUMBER).
 */

export const USER_KYC = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  IN_REVIEW: 'in_review',
  EXPIRED: 'expired',
} as const;

export type UserKycType = (typeof USER_KYC)[keyof typeof USER_KYC];
