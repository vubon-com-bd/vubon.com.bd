export const AUTH_SESSION = {
  EXPIRY_SECONDS: 86400,
  REMEMBER_ME_EXPIRY_SECONDS: 2592000,
  IDLE_TIMEOUT_SECONDS: 1800,
  ABSOLUTE_TIMEOUT_SECONDS: 604800,
  REFRESH_THRESHOLD_SECONDS: 300,
  MAX_SESSIONS_PER_USER: 5,
  CONCURRENT_LOGIN_ALLOWED: true,
  STORE_IP: true,
  STORE_USER_AGENT: true,
} as const;

export const AUTH_SESSION_EVENT = {
  CREATED: 'session.created',
  REFRESHED: 'session.refreshed',
  EXPIRED: 'session.expired',
  REVOKED: 'session.revoked',
  LOGOUT: 'session.logout',
} as const;

export type AuthSessionEventType = (typeof AUTH_SESSION_EVENT)[keyof typeof AUTH_SESSION_EVENT];
