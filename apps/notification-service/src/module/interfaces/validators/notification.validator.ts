/**
 * NotificationHttpValidator — wraps App validator → BadRequestException
 * @module notification-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { NotificationValidator as AppValidator } from '@application/validators/notification.validator.js';

export class NotificationHttpValidator {
  static validateSend(body: unknown): void {
    try {
      AppValidator.validateSend(body);
    } catch (err) {
      throw new BadRequestException(
        err instanceof Error ? err.message : 'Invalid send request',
      );
    }
  }

  static validateSendBulk(body: unknown): void {
    try {
      AppValidator.validateSendBulk(body);
    } catch (err) {
      throw new BadRequestException(
        err instanceof Error ? err.message : 'Invalid bulk request',
      );
    }
  }

  static validateResend(body: unknown): void {
    try {
      AppValidator.validateResend(body);
    } catch (err) {
      throw new BadRequestException(
        err instanceof Error ? err.message : 'Invalid resend request',
      );
    }
  }

  static validateCancel(body: unknown): void {
    try {
      AppValidator.validateCancel(body);
    } catch (err) {
      throw new BadRequestException(
        err instanceof Error ? err.message : 'Invalid cancel request',
      );
    }
  }
}
