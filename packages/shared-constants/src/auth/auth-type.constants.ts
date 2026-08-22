/**
 * Authentication Type Constants
 * Types of authentication methods
 */

export const AUTH_TYPE = {
  // Primary auth types
  LOCAL: 'local',
  SOCIAL: 'social',
  SSO: 'sso',
  OAUTH: 'oauth',
  LDAP: 'ldap',
  SAML: 'saml',

  // MFA types
  MFA_TOTP: 'mfa_totp',
  MFA_SMS: 'mfa_sms',
  MFA_EMAIL: 'mfa_email',
  MFA_BACKUP_CODE: 'mfa_backup_code',
  MFA_BIOMETRIC: 'mfa_biometric',

  // 2FA types
  TWO_FA_TOTP: '2fa_totp',
  TWO_FA_SMS: '2fa_sms',
  TWO_FA_EMAIL: '2fa_email',
  TWO_FA_AUTHENTICATOR: '2fa_authenticator',

  // Device types
  DEVICE_WEB: 'web',
  DEVICE_MOBILE: 'mobile',
  DEVICE_TABLET: 'tablet',
  DEVICE_DESKTOP: 'desktop',
  DEVICE_API: 'api',

  // Grant types
  GRANT_PASSWORD: 'password',
  GRANT_REFRESH_TOKEN: 'refresh_token',
  GRANT_AUTHORIZATION_CODE: 'authorization_code',
  GRANT_CLIENT_CREDENTIALS: 'client_credentials',
  GRANT_IMPLICIT: 'implicit',
  GRANT_PKCE: 'pkce',
} as const;

export type AuthType = (typeof AUTH_TYPE)[keyof typeof AUTH_TYPE];

export const LOCAL_AUTH_TYPES: AuthType[] = [AUTH_TYPE.LOCAL];

export const EXTERNAL_AUTH_TYPES: AuthType[] = [
  AUTH_TYPE.SOCIAL,
  AUTH_TYPE.SSO,
  AUTH_TYPE.OAUTH,
  AUTH_TYPE.LDAP,
  AUTH_TYPE.SAML,
];

export const MFA_TYPES: AuthType[] = [
  AUTH_TYPE.MFA_TOTP,
  AUTH_TYPE.MFA_SMS,
  AUTH_TYPE.MFA_EMAIL,
  AUTH_TYPE.MFA_BACKUP_CODE,
  AUTH_TYPE.MFA_BIOMETRIC,
];

export const TWO_FA_TYPES: AuthType[] = [
  AUTH_TYPE.TWO_FA_TOTP,
  AUTH_TYPE.TWO_FA_SMS,
  AUTH_TYPE.TWO_FA_EMAIL,
  AUTH_TYPE.TWO_FA_AUTHENTICATOR,
];

export const DEVICE_TYPES: AuthType[] = [
  AUTH_TYPE.DEVICE_WEB,
  AUTH_TYPE.DEVICE_MOBILE,
  AUTH_TYPE.DEVICE_TABLET,
  AUTH_TYPE.DEVICE_DESKTOP,
  AUTH_TYPE.DEVICE_API,
];

export const GRANT_TYPES: AuthType[] = [
  AUTH_TYPE.GRANT_PASSWORD,
  AUTH_TYPE.GRANT_REFRESH_TOKEN,
  AUTH_TYPE.GRANT_AUTHORIZATION_CODE,
  AUTH_TYPE.GRANT_CLIENT_CREDENTIALS,
  AUTH_TYPE.GRANT_IMPLICIT,
  AUTH_TYPE.GRANT_PKCE,
];

export function isLocalAuth(type: AuthType): boolean {
  return LOCAL_AUTH_TYPES.includes(type);
}

export function isExternalAuth(type: AuthType): boolean {
  return EXTERNAL_AUTH_TYPES.includes(type);
}

export function isMFA(type: AuthType): boolean {
  return MFA_TYPES.includes(type);
}

export function isTwoFA(type: AuthType): boolean {
  return TWO_FA_TYPES.includes(type);
}

export function isDevice(type: AuthType): boolean {
  return DEVICE_TYPES.includes(type);
}

export function isGrantType(type: AuthType): boolean {
  return GRANT_TYPES.includes(type);
}

export function getAuthTypeLabel(type: AuthType): string {
  const labels: Record<AuthType, string> = {
    [AUTH_TYPE.LOCAL]: 'Local Authentication',
    [AUTH_TYPE.SOCIAL]: 'Social Authentication',
    [AUTH_TYPE.SSO]: 'Single Sign-On',
    [AUTH_TYPE.OAUTH]: 'OAuth',
    [AUTH_TYPE.LDAP]: 'LDAP',
    [AUTH_TYPE.SAML]: 'SAML',
    [AUTH_TYPE.MFA_TOTP]: 'TOTP MFA',
    [AUTH_TYPE.MFA_SMS]: 'SMS MFA',
    [AUTH_TYPE.MFA_EMAIL]: 'Email MFA',
    [AUTH_TYPE.MFA_BACKUP_CODE]: 'Backup Code MFA',
    [AUTH_TYPE.MFA_BIOMETRIC]: 'Biometric MFA',
    [AUTH_TYPE.TWO_FA_TOTP]: 'TOTP 2FA',
    [AUTH_TYPE.TWO_FA_SMS]: 'SMS 2FA',
    [AUTH_TYPE.TWO_FA_EMAIL]: 'Email 2FA',
    [AUTH_TYPE.TWO_FA_AUTHENTICATOR]: 'Authenticator 2FA',
    [AUTH_TYPE.DEVICE_WEB]: 'Web Device',
    [AUTH_TYPE.DEVICE_MOBILE]: 'Mobile Device',
    [AUTH_TYPE.DEVICE_TABLET]: 'Tablet Device',
    [AUTH_TYPE.DEVICE_DESKTOP]: 'Desktop Device',
    [AUTH_TYPE.DEVICE_API]: 'API Device',
    [AUTH_TYPE.GRANT_PASSWORD]: 'Password Grant',
    [AUTH_TYPE.GRANT_REFRESH_TOKEN]: 'Refresh Token Grant',
    [AUTH_TYPE.GRANT_AUTHORIZATION_CODE]: 'Authorization Code Grant',
    [AUTH_TYPE.GRANT_CLIENT_CREDENTIALS]: 'Client Credentials Grant',
    [AUTH_TYPE.GRANT_IMPLICIT]: 'Implicit Grant',
    [AUTH_TYPE.GRANT_PKCE]: 'PKCE Grant',
  };

  return labels[type] || 'Unknown Type';
}
