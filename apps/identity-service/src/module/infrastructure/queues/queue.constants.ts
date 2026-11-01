/**
 * Auth-service queue constants
 * @module identity-service/infrastructure/queues
 */
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

export const AUTH_QUEUE_NAME = {
  AUTH: QUEUE_NAME.AUTH,
  SESSION: QUEUE_NAME.SESSION,
  TOKEN: QUEUE_NAME.TOKEN,
  SYNC: QUEUE_NAME.SYNC,
  NOTIFICATION: QUEUE_NAME.NOTIFICATION,
  ANALYTICS: QUEUE_NAME.ANALYTICS,
} as const;

export const AUTH_JOB_NAME = {
  // Session lifecycle
  SESSION_CLEANUP: 'session-cleanup',
  SESSION_EXPIRING_SOON: 'session-expiring-soon',

  // Token lifecycle
  TOKEN_CLEANUP: 'token-cleanup',
  TOKEN_REVOCATION_SWEEP: 'token-revocation-sweep',

  // Account lock
  LOCK_AUTO_UNLOCK: 'lock-auto-unlock',
  LOCK_SWEEP: 'lock-sweep',

  // Login attempts
  LOGIN_ATTEMPT_PURGE: 'login-attempt-purge',

  // Analytics
  ANALYTICS_EVENT: 'analytics-event',

  // Device sync
  DEVICE_SYNC: 'device-sync',

  // Notification
  SEND_EMAIL: 'send-email',
  SEND_SMS: 'send-sms',
} as const;

export const AUTH_QUEUE_LIMITS = {
  MAX_ATTEMPTS: 3,
  BACKOFF_MS: 5_000,
  CONCURRENCY: 5,
  RETRY_DELAY_MS: 30_000,
} as const;

export type AuthJobNameType = (typeof AUTH_JOB_NAME)[keyof typeof AUTH_JOB_NAME];
