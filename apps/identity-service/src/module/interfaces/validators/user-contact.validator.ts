/**
 * UserContactHttpValidator
 * @module identity-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class UserContactHttpValidator {
  static validateDelete(body: unknown): void {
    const b = body as { contactId?: unknown };
    if (typeof b?.contactId !== 'string' || !UUID_REGEX.test(b.contactId)) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Delete contact validation failed',
        details: [{ field: 'contactId', message: 'contactId must be a valid UUID' }],
      });
    }
  }
}
