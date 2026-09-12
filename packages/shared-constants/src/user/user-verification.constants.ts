/**
 * User Verification Constants
 * @module shared-constants/user/user-verification
 *
 * Note: Does NOT spread COMMON_VERIFICATION (which has nested objects).
 */

export const USER_VERIFICATION = {
  EMAIL: 'email',
  PHONE: 'phone',
  IDENTITY: 'identity',
  ADDRESS: 'address',
  INCOME: 'income',
  DOCUMENT: 'document',
  KYC: 'kyc',
} as const;

export type UserVerificationType = (typeof USER_VERIFICATION)[keyof typeof USER_VERIFICATION];
