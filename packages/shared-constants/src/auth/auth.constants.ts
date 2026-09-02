/**
 * Auth Constants - Base
 * প্রমাণীকরণ সম্পর্কিত মূল কনস্ট্যান্টস
 */

import { HTTP_STATUS, STATUS, ROLES } from '../common';

export const AUTH = {
  // Auth types
  TYPES: {
    EMAIL_PASSWORD: 'email_password',
    PHONE_PASSWORD: 'phone_password',
    SOCIAL: 'social',
    SSO: 'sso',
    OAUTH: 'oauth',
    MFA: 'mfa',
    BIOMETRIC: 'biometric',
    MAGIC_LINK: 'magic_link',
  },

  // Auth status (STATUS থেকে ম্যাপিং)
  STATUS: {
    AUTHENTICATED: 'authenticated',
    UNAUTHENTICATED: 'unauthenticated',
    VERIFIED: STATUS.VERIFIED,
    UNVERIFIED: STATUS.UNVERIFIED,
    LOCKED: 'locked',
    SUSPENDED: STATUS.SUSPENDED,
    DELETED: STATUS.DELETED,
    PENDING: STATUS.PENDING,
    EXPIRED: 'expired',
    REVOKED: 'revoked',
  },

  // Auth methods
  METHODS: {
    PASSWORD: 'password',
    OTP: 'otp',
    MAGIC_LINK: 'magic_link',
    SOCIAL: 'social',
    SSO: 'sso',
    OAUTH: 'oauth',
    MFA_TOTP: 'mfa_totp',
    MFA_SMS: 'mfa_sms',
    MFA_EMAIL: 'mfa_email',
    MFA_BACKUP_CODE: 'mfa_backup_code',
    BIOMETRIC_FINGERPRINT: 'biometric_fingerprint',
    BIOMETRIC_FACE: 'biometric_face',
    BIOMETRIC_IRIS: 'biometric_iris',
  },

  // Auth providers (ROLES থেকে ম্যাপিং)
  PROVIDERS: {
    EMAIL: 'email',
    PHONE: 'phone',
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    GITHUB: 'github',
    LINKEDIN: 'linkedin',
    TWITTER: 'twitter',
    MICROSOFT: 'microsoft',
    APPLE: 'apple',
    BANGLADESH_GOV: 'bangladesh_gov',
    NID: 'nid',
    BIRTH_REG: 'birth_reg',
    MOBILE: 'mobile',
    BANK: 'bank',
    // ROLES থেকে মান ব্যবহার
    SUPER_ADMIN: ROLES.SUPER_ADMIN,
    ADMIN: ROLES.ADMIN,
    MODERATOR: ROLES.MODERATOR,
    USER: ROLES.USER,
    VENDOR: ROLES.VENDOR,
    GUEST: ROLES.GUEST,
    MANAGER: ROLES.MANAGER,
    SUPPORT: ROLES.SUPPORT,
    DELIVERY_AGENT: ROLES.DELIVERY_AGENT,
  },

  // Session types
  SESSION: {
    WEB: 'web',
    MOBILE: 'mobile',
    API: 'api',
    WEBHOOK: 'webhook',
    SERVICE: 'service',
  },

  // Token types
  TOKEN: {
    ACCESS: 'access',
    REFRESH: 'refresh',
    VERIFICATION: 'verification',
    PASSWORD_RESET: 'password_reset',
    MAGIC_LINK: 'magic_link',
    MFA: 'mfa',
    API_KEY: 'api_key',
  },

  // HTTP Status mapping (HTTP_STATUS থেকে)
  HTTP_STATUS: {
    OK: HTTP_STATUS.OK,
    CREATED: HTTP_STATUS.CREATED,
    ACCEPTED: HTTP_STATUS.ACCEPTED,
    NO_CONTENT: HTTP_STATUS.NO_CONTENT,
    BAD_REQUEST: HTTP_STATUS.BAD_REQUEST,
    UNAUTHORIZED: HTTP_STATUS.UNAUTHORIZED,
    FORBIDDEN: HTTP_STATUS.FORBIDDEN,
    NOT_FOUND: HTTP_STATUS.NOT_FOUND,
    METHOD_NOT_ALLOWED: HTTP_STATUS.METHOD_NOT_ALLOWED,
    CONFLICT: HTTP_STATUS.CONFLICT,
    UNPROCESSABLE_ENTITY: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    TOO_MANY_REQUESTS: HTTP_STATUS.TOO_MANY_REQUESTS,
    INTERNAL_SERVER_ERROR: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    BAD_GATEWAY: HTTP_STATUS.BAD_GATEWAY,
    SERVICE_UNAVAILABLE: HTTP_STATUS.SERVICE_UNAVAILABLE,
    GATEWAY_TIMEOUT: HTTP_STATUS.GATEWAY_TIMEOUT,
  },

  // Default values
  DEFAULTS: {
    SESSION_TIMEOUT: 3600, // 1 hour
    REFRESH_TOKEN_EXPIRY: 604800, // 7 days
    VERIFICATION_EXPIRY: 86400, // 24 hours
    PASSWORD_RESET_EXPIRY: 3600, // 1 hour
    MFA_CODE_EXPIRY: 300, // 5 minutes
    LOGIN_ATTEMPT_LIMIT: 5,
    LOCKOUT_DURATION: 900, // 15 minutes
  },
} as const;

export type AuthType = (typeof AUTH.TYPES)[keyof typeof AUTH.TYPES];
export type AuthStatus = (typeof AUTH.STATUS)[keyof typeof AUTH.STATUS];
export type AuthMethod = (typeof AUTH.METHODS)[keyof typeof AUTH.METHODS];
export type AuthProvider = (typeof AUTH.PROVIDERS)[keyof typeof AUTH.PROVIDERS];
export type AuthSessionType = (typeof AUTH.SESSION)[keyof typeof AUTH.SESSION];
export type AuthTokenType = (typeof AUTH.TOKEN)[keyof typeof AUTH.TOKEN];
export type AuthHttpStatus = (typeof AUTH.HTTP_STATUS)[keyof typeof AUTH.HTTP_STATUS];
