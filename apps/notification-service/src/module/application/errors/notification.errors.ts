/**
 * Notification Application Errors
 * @module notification-service/application/errors
 *
 * Typed error hierarchy — HTTP layer এ auto-map হয়।
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import {
  ApplicationError,
  ApplicationNotFoundError,
  ApplicationValidationError,
  CommandError,
  QueryError,
} from '@vubon/shared-kernel/application/errors';

// ─── Not Found (404) ──────────────────────
export class NotificationNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(notificationId: string) {
    super('Notification', notificationId);
    this.name = 'NotificationNotFoundApplicationError';
  }
}

// ─── Validation (422) ─────────────────────
export class NotificationValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'NotificationValidationError';
  }
}

// ─── Command errors (400) ─────────────────
export class NotificationSendError extends CommandError {
  constructor(reason: string) {
    super(`Notification send failed: ${reason}`, 'SendNotification');
    this.name = 'NotificationSendError';
  }
}

export class NotificationCancelError extends CommandError {
  constructor(notificationId: string, reason: string) {
    super(`Notification "${notificationId}" cancel failed: ${reason}`, 'CancelNotification');
    this.name = 'NotificationCancelError';
  }
}

export class NotificationResendError extends CommandError {
  constructor(notificationId: string, reason: string) {
    super(`Notification "${notificationId}" resend failed: ${reason}`, 'ResendNotification');
    this.name = 'NotificationResendError';
  }
}

// ─── Conflict (409) ───────────────────────
export class NotificationIdempotencyConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(key: string, existingId?: string) {
    super(
      `Idempotency key "${key}" already processed${existingId ? ` → ${existingId}` : ''}`,
      { key, existingId },
    );
    this.name = 'NotificationIdempotencyConflictError';
  }
}

// ─── Query errors (400) ───────────────────
export class NotificationQueryError extends QueryError {
  constructor(reason: string) {
    super(`Notification query failed: ${reason}`, 'NotificationQuery');
    this.name = 'NotificationQueryError';
  }
}
