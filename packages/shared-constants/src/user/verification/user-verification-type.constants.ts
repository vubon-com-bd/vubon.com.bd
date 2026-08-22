/**
 * User Verification Type Constants
 * Defines all possible user verification types
 */

export const USER_VERIFICATION_TYPE = {
  EMAIL: 'email',
  PHONE: 'phone',
  WHATSAPP: 'whatsapp',
  TWO_FACTOR: 'two-factor',
  KYC: 'kyc',
  PASSWORD_RESET: 'password-reset',
  ACCOUNT_RECOVERY: 'account-recovery',
  DEVICE: 'device',
  BIOMETRIC: 'biometric',
  PAYMENT: 'payment',
  WITHDRAWAL: 'withdrawal',
  ACCOUNT_DELETION: 'account-deletion',
} as const;

export type UserVerificationType =
  (typeof USER_VERIFICATION_TYPE)[keyof typeof USER_VERIFICATION_TYPE];

export const USER_VERIFICATION_TYPE_LABELS: Record<UserVerificationType, string> = {
  [USER_VERIFICATION_TYPE.EMAIL]: 'Email Verification',
  [USER_VERIFICATION_TYPE.PHONE]: 'Phone Verification',
  [USER_VERIFICATION_TYPE.WHATSAPP]: 'WhatsApp Verification',
  [USER_VERIFICATION_TYPE.TWO_FACTOR]: 'Two-Factor Authentication',
  [USER_VERIFICATION_TYPE.KYC]: 'KYC Verification',
  [USER_VERIFICATION_TYPE.PASSWORD_RESET]: 'Password Reset',
  [USER_VERIFICATION_TYPE.ACCOUNT_RECOVERY]: 'Account Recovery',
  [USER_VERIFICATION_TYPE.DEVICE]: 'Device Verification',
  [USER_VERIFICATION_TYPE.BIOMETRIC]: 'Biometric Verification',
  [USER_VERIFICATION_TYPE.PAYMENT]: 'Payment Verification',
  [USER_VERIFICATION_TYPE.WITHDRAWAL]: 'Withdrawal Verification',
  [USER_VERIFICATION_TYPE.ACCOUNT_DELETION]: 'Account Deletion Verification',
};

export const USER_VERIFICATION_TYPE_DESCRIPTIONS: Record<UserVerificationType, string> = {
  [USER_VERIFICATION_TYPE.EMAIL]: 'Verify user email address',
  [USER_VERIFICATION_TYPE.PHONE]: 'Verify user phone number',
  [USER_VERIFICATION_TYPE.WHATSAPP]: 'Verify user WhatsApp number',
  [USER_VERIFICATION_TYPE.TWO_FACTOR]: 'Two-factor authentication verification',
  [USER_VERIFICATION_TYPE.KYC]: 'Know Your Customer verification',
  [USER_VERIFICATION_TYPE.PASSWORD_RESET]: 'Reset user password verification',
  [USER_VERIFICATION_TYPE.ACCOUNT_RECOVERY]: 'Recover user account verification',
  [USER_VERIFICATION_TYPE.DEVICE]: 'Verify user device',
  [USER_VERIFICATION_TYPE.BIOMETRIC]: 'Verify biometric authentication',
  [USER_VERIFICATION_TYPE.PAYMENT]: 'Verify payment transaction',
  [USER_VERIFICATION_TYPE.WITHDRAWAL]: 'Verify withdrawal request',
  [USER_VERIFICATION_TYPE.ACCOUNT_DELETION]: 'Verify account deletion request',
};

export const CONTACT_VERIFICATION_TYPES: UserVerificationType[] = [
  USER_VERIFICATION_TYPE.EMAIL,
  USER_VERIFICATION_TYPE.PHONE,
  USER_VERIFICATION_TYPE.WHATSAPP,
];

export const SECURITY_VERIFICATION_TYPES: UserVerificationType[] = [
  USER_VERIFICATION_TYPE.TWO_FACTOR,
  USER_VERIFICATION_TYPE.PASSWORD_RESET,
  USER_VERIFICATION_TYPE.ACCOUNT_RECOVERY,
  USER_VERIFICATION_TYPE.DEVICE,
  USER_VERIFICATION_TYPE.BIOMETRIC,
];

export const FINANCIAL_VERIFICATION_TYPES: UserVerificationType[] = [
  USER_VERIFICATION_TYPE.KYC,
  USER_VERIFICATION_TYPE.PAYMENT,
  USER_VERIFICATION_TYPE.WITHDRAWAL,
];

export const ACCOUNT_VERIFICATION_TYPES: UserVerificationType[] = [
  USER_VERIFICATION_TYPE.ACCOUNT_DELETION,
];

export function isContactVerification(type: UserVerificationType): boolean {
  return CONTACT_VERIFICATION_TYPES.includes(type);
}

export function isSecurityVerification(type: UserVerificationType): boolean {
  return SECURITY_VERIFICATION_TYPES.includes(type);
}

export function isFinancialVerification(type: UserVerificationType): boolean {
  return FINANCIAL_VERIFICATION_TYPES.includes(type);
}

export function isAccountVerification(type: UserVerificationType): boolean {
  return ACCOUNT_VERIFICATION_TYPES.includes(type);
}

export function getVerificationTypeLabel(type: UserVerificationType): string {
  return USER_VERIFICATION_TYPE_LABELS[type] || 'Unknown';
}

export function getVerificationTypeDescription(type: UserVerificationType): string {
  return USER_VERIFICATION_TYPE_DESCRIPTIONS[type] || '';
}

export function getVerificationTypeByValue(value: string): UserVerificationType | null {
  const normalized = value.toLowerCase();
  const types = Object.values(USER_VERIFICATION_TYPE);
  return types.find((type) => type.toLowerCase() === normalized) || null;
}
