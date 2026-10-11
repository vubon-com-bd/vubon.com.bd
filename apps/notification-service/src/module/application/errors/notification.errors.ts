/**
 * Notification Application Errors
 * @module notification-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class NotificationNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(notificationId: string) {
    super('Notification', notificationId);
    this.name = 'NotificationNotFoundApplicationError';
  }
}

export class NotificationSendError extends CommandError {
  constructor(reason: string, context?: Readonly<Record<string, unknown>>) {
    super(`Notification send failed: ${reason}`, 'NotificationSend', undefined);
    void context;
    this.name = 'NotificationSendError';
  }
}

export class NotificationAlreadySentError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(notificationId: string) {
    super(`Notification "${notificationId}" has already been sent`, { notificationId });
    this.name = 'NotificationAlreadySentError';
  }
}

export class NotificationSuppressedError extends ApplicationError {
  readonly code = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;
  constructor(notificationId: string, reason: string) {
    super(`Notification "${notificationId}" suppressed: ${reason}`, { notificationId, reason });
    this.name = 'NotificationSuppressedError';
  }
}

export class NotificationRateLimitError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 429;
  constructor(channel: string, limit: number, window: string) {
    super(`Rate limit exceeded for channel "${channel}" (${limit}/${window})`, {
      channel,
      limit,
      window,
    });
    this.name = 'NotificationRateLimitError';
  }
}

export class NotificationValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'NotificationValidationError';
  }
}

export class NotificationChannelDisabledError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 503;
  constructor(channel: string) {
    super(`Notification channel "${channel}" is disabled`, { channel });
    this.name = 'NotificationChannelDisabledError';
  }
}
