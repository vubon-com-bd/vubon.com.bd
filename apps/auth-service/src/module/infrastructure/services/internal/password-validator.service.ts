/**
 * PasswordValidatorService — Composite password strength validation
 * @module auth-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { REGEX } from '@vubon/shared-constants/common';
import { VALIDATION } from '@vubon/shared-constants/common';
import { WeakPasswordError } from '../../../domain/errors/password.errors';

const COMMON_WEAK = new Set<string>([
  'password', 'password1', 'password123', '12345678', '123456789',
  'qwerty123', 'admin123', 'letmein', 'welcome1', 'iloveyou',
]);

@Injectable()
export class PasswordValidatorService {
  readonly name = 'PasswordValidatorService';

  validate(password: string, context?: { email?: string }): void {
    const missing: string[] = [];

    if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      missing.push(`min length ${VALIDATION.PASSWORD_MIN_LENGTH}`);
    }
    if (password.length > VALIDATION.PASSWORD_MAX_LENGTH) {
      missing.push(`max length ${VALIDATION.PASSWORD_MAX_LENGTH}`);
    }
    if (!REGEX.PASSWORD_STRONG.test(password)) {
      missing.push('lowercase, uppercase, digit, and special char');
    }
    if (COMMON_WEAK.has(password.toLowerCase())) {
      missing.push('not in common weak list');
    }
    if (context?.email) {
      const localPart = context.email.split('@')[0]?.toLowerCase();
      if (localPart && localPart.length >= 3 && password.toLowerCase().includes(localPart)) {
        missing.push('must not contain email');
      }
    }

    if (missing.length > 0) {
      throw new WeakPasswordError(missing);
    }
  }
}
