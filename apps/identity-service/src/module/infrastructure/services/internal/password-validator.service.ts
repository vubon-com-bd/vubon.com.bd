/**
 * PasswordValidatorService — enforce password policy
 * @module identity-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { REGEX } from '@vubon/shared-constants/common';
import { PasswordTooWeakError } from '../../../domain/errors/credential.errors.js';

export interface PasswordValidationResult {
  readonly valid: boolean;
  readonly reasons: readonly string[];
}

@Injectable()
export class PasswordValidatorService {
  validate(password: string): PasswordValidationResult {
    const reasons: string[] = [];

    if (typeof password !== 'string' || password.length === 0) {
      reasons.push('empty');
    } else {
      if (password.length < 8) reasons.push('too_short');
      if (password.length > 128) reasons.push('too_long');
      if (!/[a-z]/.test(password)) reasons.push('no_lowercase');
      if (!/[A-Z]/.test(password)) reasons.push('no_uppercase');
      if (!/\d/.test(password)) reasons.push('no_number');
      if (!/[^A-Za-z0-9]/.test(password)) reasons.push('no_symbol');
      if (!REGEX.PASSWORD_STRONG.test(password)) reasons.push('not_strong');
    }

    return { valid: reasons.length === 0, reasons };
  }

  assertValid(password: string): void {
    const result = this.validate(password);
    if (!result.valid) {
      throw new PasswordTooWeakError(result.reasons);
    }
  }

  isStrong(password: string): boolean {
    return REGEX.PASSWORD_STRONG.test(password);
  }
}
