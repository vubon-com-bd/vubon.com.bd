/**
 * SocialHttpValidator
 * @module identity-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { SocialLoginRequestSchema } from '@vubon/shared-schemas/auth';

export class SocialHttpValidator {
  static validateLogin(body: unknown): void {
    const result = SocialLoginRequestSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Social login validation failed',
        details: result.error.issues.map((i) => ({
          field: i.path.join('.'),
          message: i.message,
        })),
      });
    }
  }

  static validateUnlink(body: unknown): void {
    const bodyObj = body as { provider?: unknown };
    if (typeof bodyObj?.provider !== 'string' || bodyObj.provider.length === 0) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Provider is required',
        details: [{ field: 'provider', message: 'Provider is required' }],
      });
    }
  }
}
