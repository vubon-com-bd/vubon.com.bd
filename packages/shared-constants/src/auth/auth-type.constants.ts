export const AUTH_TYPE = {
  PASSWORD: 'password',
  OTP: 'otp',
  MAGIC_LINK: 'magic_link',
  SOCIAL: 'social',
  OAUTH: 'oauth',
  SSO: 'sso',
  BIOMETRIC: 'biometric',
  API_KEY: 'api_key',
  ANONYMOUS: 'anonymous',
} as const;

export type AuthTypeType = (typeof AUTH_TYPE)[keyof typeof AUTH_TYPE];
