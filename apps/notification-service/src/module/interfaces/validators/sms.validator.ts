/**
 * SmsHttpValidator
 * @module notification-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';

export class SmsHttpValidator {
  static validateSend(body: unknown): void {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('SMS body is required');
    }
    const obj = body as Record<string, unknown>;
    if (!obj['to']) {
      throw new BadRequestException('SMS "to" is required');
    }
    if (typeof obj['message'] !== 'string' || obj['message'].length === 0) {
      throw new BadRequestException('SMS message is required');
    }
    if (typeof obj['type'] !== 'string') {
      throw new BadRequestException('SMS type is required');
    }
  }

  static validateBulk(body: unknown): void {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Bulk SMS body is required');
    }
    const obj = body as Record<string, unknown>;
    if (!Array.isArray(obj['recipients']) || obj['recipients'].length === 0) {
      throw new BadRequestException('Bulk SMS recipients are required');
    }
    const hasTopMessage = typeof obj['message'] === 'string';
    const allHaveMessages = (obj['recipients'] as readonly unknown[]).every(
      (r) =>
        typeof r === 'object' &&
        r !== null &&
        typeof (r as Record<string, unknown>)['message'] === 'string',
    );
    if (!hasTopMessage && !allHaveMessages) {
      throw new BadRequestException(
        'Either top-level message or per-recipient messages required',
      );
    }
  }
}
