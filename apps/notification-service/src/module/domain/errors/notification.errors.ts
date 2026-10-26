/* istanbul ignore file -- pure error declarations */
/**
 * Notification Domain Errors
 * @module notification-service/domain/errors
 *
 * Typed error hierarchy — HTTP layer এ auto-map হয়।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class NotificationNotFoundError extends NotFoundError {
  constructor(notificationId: string) {
    super('Notification', notificationId);
    this.name = 'NotificationNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class NotificationAlreadySentError extends ConflictError {
  constructor(notificationId: string) {
    super(`Notification "${notificationId}" has already been sent`, 'notificationId');
    this.name = 'NotificationAlreadySentError';
  }
}

export class NotificationDuplicateError extends ConflictError {
  constructor(idempotencyKey: string, existingId: string) {
    super(
      `Notification with idempotency key "${idempotencyKey}" already exists as "${existingId}"`,
      'idempotencyKey',
    );
    this.name = 'NotificationDuplicateError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidNotificationStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid notification status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidNotificationStatusError';
  }
}

export class InvalidNotificationTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid notification type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidNotificationTypeError';
  }
}

export class InvalidNotificationChannelError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid notification channel "${value}". Allowed: ${allowed.join(', ')}`, 'channel');
    this.name = 'InvalidNotificationChannelError';
  }
}

export class InvalidNotificationPriorityError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid notification priority "${value}". Allowed: ${allowed.join(', ')}`, 'priority');
    this.name = 'InvalidNotificationPriorityError';
  }
}

export class InvalidNotificationCategoryError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid notification category "${value}". Allowed: ${allowed.join(', ')}`, 'category');
    this.name = 'InvalidNotificationCategoryError';
  }
}

export class InvalidNotificationSubjectError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid notification subject: ${reason}`, 'subject');
    this.name = 'InvalidNotificationSubjectError';
  }
}

export class InvalidNotificationBodyError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid notification body: ${reason}`, 'body');
    this.name = 'InvalidNotificationBodyError';
  }
}

export class InvalidNotificationDataError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid notification data: ${reason}`, 'data');
    this.name = 'InvalidNotificationDataError';
  }
}

// ─── Business Rule (400) ───────────────────
export class InvalidNotificationStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, notificationId?: string) {
    super(
      `Cannot transition notification status from "${from}" to "${to}"`,
      'INVALID_NOTIFICATION_STATUS_TRANSITION',
      { from, to, notificationId },
    );
    this.name = 'InvalidNotificationStatusTransitionError';
  }
}

export class NotificationCannotBeSentError extends BusinessRuleError {
  constructor(notificationId: string, reason: string) {
    super(
      `Notification "${notificationId}" cannot be sent: ${reason}`,
      'NOTIFICATION_CANNOT_BE_SENT',
      { notificationId, reason },
    );
    this.name = 'NotificationCannotBeSentError';
  }
}

export class NotificationCannotBeCancelledError extends BusinessRuleError {
  constructor(notificationId: string, status: string) {
    super(
      `Notification "${notificationId}" cannot be cancelled in status "${status}"`,
      'NOTIFICATION_CANNOT_BE_CANCELLED',
      { notificationId, status },
    );
    this.name = 'NotificationCannotBeCancelledError';
  }
}

export class NotificationExpiredError extends BusinessRuleError {
  constructor(notificationId: string, expiredAt: string) {
    super(`Notification "${notificationId}" expired at ${expiredAt}`, 'NOTIFICATION_EXPIRED', {
      notificationId,
      expiredAt,
    });
    this.name = 'NotificationExpiredError';
  }
}

export class NotificationQuietHoursError extends BusinessRuleError {
  constructor(userId: string, quietStart: number, quietEnd: number) {
    super(
      `Cannot send notification to user "${userId}" during quiet hours (${quietStart}:00-${quietEnd}:00)`,
      'NOTIFICATION_QUIET_HOURS_ACTIVE',
      { userId, quietStart, quietEnd },
    );
    this.name = 'NotificationQuietHoursError';
  }
}

export class NotificationRateLimitedError extends BusinessRuleError {
  constructor(channel: string, limit: number, window: string) {
    super(
      `Notification rate limit exceeded for channel "${channel}": ${limit}/${window}`,
      'NOTIFICATION_RATE_LIMITED',
      { channel, limit, window },
    );
    this.name = 'NotificationRateLimitedError';
  }
}
