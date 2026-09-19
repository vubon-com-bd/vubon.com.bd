import { Injectable } from '@nestjs/common';
import { SECURITY } from '@vubon/shared-constants/security';
import { WeakPasswordError } from '../../../domain/errors/password.errors';

@Injectable()
export class PasswordValidatorService {
  validate(password: string): void {
    if (password.length < SECURITY.PASSWORD_MIN_LENGTH) {
      throw new WeakPasswordError(
        `minimum length is ${SECURITY.PASSWORD_MIN_LENGTH}`,
      );
    }
    if (password.length > SECURITY.PASSWORD_MAX_LENGTH) {
      throw new WeakPasswordError(
        `maximum length is ${SECURITY.PASSWORD_MAX_LENGTH}`,
      );
    }
    if (SECURITY.PASSWORD_REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
      throw new WeakPasswordError('uppercase letter required');
    }
    if (SECURITY.PASSWORD_REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
      throw new WeakPasswordError('lowercase letter required');
    }
    if (SECURITY.PASSWORD_REQUIRE_NUMBER && !/\d/.test(password)) {
      throw new WeakPasswordError('digit required');
    }
    if (SECURITY.PASSWORD_REQUIRE_SYMBOL && !/[^A-Za-z0-9]/.test(password)) {
      throw new WeakPasswordError('special character required');
    }
  }
}
