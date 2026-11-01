/**
 * UserAddressHttpValidator — DELETE-specific validation
 * @module identity-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class UserAddressHttpValidator {
  static validateDelete(body: unknown): void {
    const b = body as { addressId?: unknown };
    if (typeof b?.addressId !== 'string' || !UUID_REGEX.test(b.addressId)) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Delete address validation failed',
        details: [{ field: 'addressId', message: 'addressId must be a valid UUID' }],
      });
    }
  }
}
