/**
 * Verification API endpoint paths.
 * @module shared-api/endpoints/verification
 */

export const VERIFICATION_ENDPOINTS = {
  SEND: '/verification/send',
  VERIFY: '/verification/verify',
  RESEND: '/verification/resend',
  STATUS: '/verification/status',
  EMAIL_SEND: '/verification/email/send',
  EMAIL_VERIFY: '/verification/email/verify',
  PHONE_SEND: '/verification/phone/send',
  PHONE_VERIFY: '/verification/phone/verify',
  DOCUMENT_UPLOAD: '/verification/document/upload',
  DOCUMENT_VERIFY: '/verification/document/verify',
  KYC_SUBMIT: '/verification/kyc/submit',
  KYC_STATUS: '/verification/kyc/status',
} as const;
