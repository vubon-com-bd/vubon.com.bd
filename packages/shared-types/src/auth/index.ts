/**
 * Auth Types Index
 * সকল Auth টাইপ এক্সপোর্ট
 */

// Base exports (AuthTokenType আলাদা করে নেওয়া হয়েছে)
export * from './auth.types';

// Request & Response
export * from './auth-request.types';
export * from './auth-response.types';

// Session & Token (AuthTokenType এখান থেকে নেওয়া)
export {
  AuthToken,
  AuthAccessToken,
  AuthRefreshToken,
  AuthTokenPayload,
  AuthTokenCreateInput,
} from './auth-token.types';
export type { AuthTokenType } from './auth-token.types';

// Verification
export * from './auth-verification.types';

// MFA (AuthMFAResponse নাম পরিবর্তন করা হয়েছে)
export {
  AuthMFA,
  AuthMFASetupInput,
  AuthMFAVerifyInput,
  AuthMFASetupResponse,
} from './auth-mfa.types';
export type { AuthMFAType, AuthMFAStatus, AuthMFAMethod } from './auth-mfa.types';

// 2FA
export * from './auth-2fa.types';

// Recovery & Account Lock
export * from './auth-recovery-code.types';
export * from './auth-account-lock.types';

// Login Attempt & Device
export * from './auth-login-attempt.types';
export * from './auth-device.types';

// Social & OAuth & SSO
export * from './auth-social.types';
export * from './auth-oauth.types';
export * from './auth-sso.types';

// Biometric
export * from './auth-biometric.types';

// Permission & Role & session
export * from './auth-permission.types';
export * from './auth-role.types';
export * from './auth-session.types';

// Settings & Preferences
export * from './auth-settings.types';
export * from './auth-preferences.types';
