import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class NotificationNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(notificationId: string) {
    super(`Notification not found: ${notificationId}`, { notificationId });
  }
}

export class InvalidChannelError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(channel: string) {
    super(`Invalid notification channel: ${channel}`, { channel });
  }
}
