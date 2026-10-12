/**
 * SsoHttpValidator
 * @module identity-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { SsoLoginRequestSchema } from '@vubon/shared-schemas/auth';

export class SsoHttpValidator {
  static validateLogin(body: unknown): void {
    const result = SsoLoginRequestSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'SSO login validation failed',
        details: result.error.issues.map((i) => ({
          field: i.path.join('.'),
          message: i.message,
        })),
      });
    }
  }
}
