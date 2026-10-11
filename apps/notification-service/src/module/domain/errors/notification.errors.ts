/**
 * Notification domain errors
 * @module notification-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class NotificationNotFoundError extends NotFoundError {
  constructor(notificationId: string) {
    super('Notification', notificationId);
    this.name = 'NotificationNotFoundError';
  }
}

export class NotificationAlreadySentError extends ConflictError {
  constructor(notificationId: string) {
    super(`Notification "${notificationId}" has already been sent`, 'notificationId');
    this.name = 'NotificationAlreadySentError';
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

export class InvalidNotificationStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid notification status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidNotificationStatusError';
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
    super(
      `Notification "${notificationId}" expired at ${expiredAt}`,
      'NOTIFICATION_EXPIRED',
      { notificationId, expiredAt },
    );
    this.name = 'NotificationExpiredError';
  }
}
