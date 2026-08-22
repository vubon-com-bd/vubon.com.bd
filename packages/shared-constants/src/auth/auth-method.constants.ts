/**
 * Authentication Method Constants
 * Available authentication methods
 */

export const AUTH_METHOD = {
  // Primary methods
  PASSWORD: 'password',
  MAGIC_LINK: 'magic_link',
  OTP: 'otp',
  QR_CODE: 'qr_code',
  BIOMETRIC: 'biometric',

  // OTP methods
  OTP_SMS: 'otp_sms',
  OTP_EMAIL: 'otp_email',
  OTP_AUTHENTICATOR: 'otp_authenticator',
  OTP_VOICE: 'otp_voice',
  OTP_WHATSAPP: 'otp_whatsapp',

  // Biometric methods
  FINGERPRINT: 'fingerprint',
  FACE_ID: 'face_id',
  IRIS_SCAN: 'iris_scan',
  VOICE_RECOGNITION: 'voice_recognition',

  // Social methods
  SOCIAL_OAUTH: 'social_oauth',
  SOCIAL_OAUTH2: 'social_oauth2',
  SOCIAL_OIDC: 'social_oidc',

  // SSO methods
  SAML: 'saml',
  LDAP: 'ldap',
  KERBEROS: 'kerberos',

  // Token methods
  BEARER_TOKEN: 'bearer_token',
  API_KEY: 'api_key',
  JWT: 'jwt',

  // Device methods
  DEVICE_COOKIE: 'device_cookie',
  DEVICE_FINGERPRINT: 'device_fingerprint',
} as const;

export type AuthMethod = (typeof AUTH_METHOD)[keyof typeof AUTH_METHOD];

export const OTP_METHODS: AuthMethod[] = [
  AUTH_METHOD.OTP,
  AUTH_METHOD.OTP_SMS,
  AUTH_METHOD.OTP_EMAIL,
  AUTH_METHOD.OTP_AUTHENTICATOR,
  AUTH_METHOD.OTP_VOICE,
  AUTH_METHOD.OTP_WHATSAPP,
];

export const BIOMETRIC_METHODS: AuthMethod[] = [
  AUTH_METHOD.BIOMETRIC,
  AUTH_METHOD.FINGERPRINT,
  AUTH_METHOD.FACE_ID,
  AUTH_METHOD.IRIS_SCAN,
  AUTH_METHOD.VOICE_RECOGNITION,
];

export const SOCIAL_METHODS: AuthMethod[] = [
  AUTH_METHOD.SOCIAL_OAUTH,
  AUTH_METHOD.SOCIAL_OAUTH2,
  AUTH_METHOD.SOCIAL_OIDC,
];

export const SSO_METHODS: AuthMethod[] = [AUTH_METHOD.SAML, AUTH_METHOD.LDAP, AUTH_METHOD.KERBEROS];

export const TOKEN_METHODS: AuthMethod[] = [
  AUTH_METHOD.BEARER_TOKEN,
  AUTH_METHOD.API_KEY,
  AUTH_METHOD.JWT,
];

export const DEVICE_METHODS: AuthMethod[] = [
  AUTH_METHOD.DEVICE_COOKIE,
  AUTH_METHOD.DEVICE_FINGERPRINT,
];

export function isOTPMethod(method: AuthMethod): boolean {
  return OTP_METHODS.includes(method);
}

export function isBiometricMethod(method: AuthMethod): boolean {
  return BIOMETRIC_METHODS.includes(method);
}

export function isSocialMethod(method: AuthMethod): boolean {
  return SOCIAL_METHODS.includes(method);
}

export function isSSOMethod(method: AuthMethod): boolean {
  return SSO_METHODS.includes(method);
}

export function isTokenMethod(method: AuthMethod): boolean {
  return TOKEN_METHODS.includes(method);
}

export function isDeviceMethod(method: AuthMethod): boolean {
  return DEVICE_METHODS.includes(method);
}

export function getMethodLabel(method: AuthMethod): string {
  const labels: Record<AuthMethod, string> = {
    [AUTH_METHOD.PASSWORD]: 'Password',
    [AUTH_METHOD.MAGIC_LINK]: 'Magic Link',
    [AUTH_METHOD.OTP]: 'One-Time Password',
    [AUTH_METHOD.QR_CODE]: 'QR Code',
    [AUTH_METHOD.BIOMETRIC]: 'Biometric',
    [AUTH_METHOD.OTP_SMS]: 'SMS OTP',
    [AUTH_METHOD.OTP_EMAIL]: 'Email OTP',
    [AUTH_METHOD.OTP_AUTHENTICATOR]: 'Authenticator OTP',
    [AUTH_METHOD.OTP_VOICE]: 'Voice OTP',
    [AUTH_METHOD.OTP_WHATSAPP]: 'WhatsApp OTP',
    [AUTH_METHOD.FINGERPRINT]: 'Fingerprint',
    [AUTH_METHOD.FACE_ID]: 'Face ID',
    [AUTH_METHOD.IRIS_SCAN]: 'Iris Scan',
    [AUTH_METHOD.VOICE_RECOGNITION]: 'Voice Recognition',
    [AUTH_METHOD.SOCIAL_OAUTH]: 'Social OAuth',
    [AUTH_METHOD.SOCIAL_OAUTH2]: 'Social OAuth 2.0',
    [AUTH_METHOD.SOCIAL_OIDC]: 'Social OpenID Connect',
    [AUTH_METHOD.SAML]: 'SAML',
    [AUTH_METHOD.LDAP]: 'LDAP',
    [AUTH_METHOD.KERBEROS]: 'Kerberos',
    [AUTH_METHOD.BEARER_TOKEN]: 'Bearer Token',
    [AUTH_METHOD.API_KEY]: 'API Key',
    [AUTH_METHOD.JWT]: 'JWT',
    [AUTH_METHOD.DEVICE_COOKIE]: 'Device Cookie',
    [AUTH_METHOD.DEVICE_FINGERPRINT]: 'Device Fingerprint',
  };

  return labels[method] || 'Unknown Method';
}

export function getMethodSecurityLevel(
  method: AuthMethod
): 'low' | 'medium' | 'high' | 'very_high' {
  const levels: Record<AuthMethod, 'low' | 'medium' | 'high' | 'very_high'> = {
    [AUTH_METHOD.PASSWORD]: 'medium',
    [AUTH_METHOD.MAGIC_LINK]: 'high',
    [AUTH_METHOD.OTP]: 'high',
    [AUTH_METHOD.QR_CODE]: 'medium',
    [AUTH_METHOD.BIOMETRIC]: 'very_high',
    [AUTH_METHOD.OTP_SMS]: 'high',
    [AUTH_METHOD.OTP_EMAIL]: 'high',
    [AUTH_METHOD.OTP_AUTHENTICATOR]: 'very_high',
    [AUTH_METHOD.OTP_VOICE]: 'high',
    [AUTH_METHOD.OTP_WHATSAPP]: 'medium',
    [AUTH_METHOD.FINGERPRINT]: 'very_high',
    [AUTH_METHOD.FACE_ID]: 'very_high',
    [AUTH_METHOD.IRIS_SCAN]: 'very_high',
    [AUTH_METHOD.VOICE_RECOGNITION]: 'high',
    [AUTH_METHOD.SOCIAL_OAUTH]: 'medium',
    [AUTH_METHOD.SOCIAL_OAUTH2]: 'high',
    [AUTH_METHOD.SOCIAL_OIDC]: 'high',
    [AUTH_METHOD.SAML]: 'high',
    [AUTH_METHOD.LDAP]: 'medium',
    [AUTH_METHOD.KERBEROS]: 'high',
    [AUTH_METHOD.BEARER_TOKEN]: 'medium',
    [AUTH_METHOD.API_KEY]: 'medium',
    [AUTH_METHOD.JWT]: 'high',
    [AUTH_METHOD.DEVICE_COOKIE]: 'medium',
    [AUTH_METHOD.DEVICE_FINGERPRINT]: 'high',
  };

  return levels[method] || 'medium';
}
