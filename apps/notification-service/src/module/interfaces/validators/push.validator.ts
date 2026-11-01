/**
 * PushHttpValidator
 * @module notification-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';

export class PushHttpValidator {
  static validateSend(body: unknown): void {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Push body is required');
    }
    const obj = body as Record<string, unknown>;
    if (!Array.isArray(obj['tokens']) || obj['tokens'].length === 0) {
      throw new BadRequestException('Push tokens are required');
    }
    if (typeof obj['title'] !== 'string' || obj['title'].length === 0) {
      throw new BadRequestException('Push title is required');
    }
    if (typeof obj['body'] !== 'string' || obj['body'].length === 0) {
      throw new BadRequestException('Push body text is required');
    }
  }

  static validateBulk(body: unknown): void {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Bulk push body is required');
    }
    const obj = body as Record<string, unknown>;
    if (!Array.isArray(obj['tokens']) || obj['tokens'].length === 0) {
      throw new BadRequestException('Bulk push tokens are required');
    }
  }
}
