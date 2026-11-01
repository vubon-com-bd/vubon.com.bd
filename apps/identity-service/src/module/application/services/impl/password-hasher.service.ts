/**
 * Password Hasher Service — Infrastructure stub
 * @module identity-service/application/services/impl
 *
 * ⚠️ Real bcrypt implementation belongs in infrastructure layer.
 * This is a stub for interface satisfaction.
 */
import { Injectable } from '@nestjs/common';
import type { PasswordHasherServiceInterface } from '../interfaces/password-hasher.service.interface.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

class PasswordHasherNotImplementedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 501;

  constructor(method: string) {
    super(`PasswordHasherService.${method} must be implemented in infrastructure layer`, { method });
    this.name = 'PasswordHasherNotImplementedError';
  }
}

@Injectable()
export class PasswordHasherService implements PasswordHasherServiceInterface {
  readonly name = 'PasswordHasherService';

  async hash(_plain: string): Promise<string> {
    throw new PasswordHasherNotImplementedError('hash');
  }

  async verify(_plain: string, _hash: string): Promise<boolean> {
    throw new PasswordHasherNotImplementedError('verify');
  }
}
