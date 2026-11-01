/**
 * UserKycHttpValidator
 * @module identity-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class UserKycHttpValidator {
  static validateVerify(body: unknown): void {
    const b = body as { kycId?: unknown };
    if (typeof b?.kycId !== 'string' || !UUID_REGEX.test(b.kycId)) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Verify KYC validation failed',
        details: [{ field: 'kycId', message: 'kycId must be a valid UUID' }],
      });
    }
  }

  static validateReject(body: unknown): void {
    const b = body as { kycId?: unknown; reason?: unknown };
    const details: { field: string; message: string }[] = [];

    if (typeof b?.kycId !== 'string' || !UUID_REGEX.test(b.kycId)) {
      details.push({ field: 'kycId', message: 'kycId must be a valid UUID' });
    }
    if (typeof b?.reason !== 'string' || b.reason.length < 5) {
      details.push({
        field: 'reason',
        message: 'reason must be at least 5 characters',
      });
    }

    if (details.length > 0) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Reject KYC validation failed',
        details,
      });
    }
  }
}
