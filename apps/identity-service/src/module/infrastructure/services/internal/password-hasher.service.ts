/**
 * PasswordHasherService — bcrypt-based password hashing
 * @module identity-service/infrastructure/services/internal
 *
 * Implements the application-layer PasswordHasherServiceInterface.
 */
import { Injectable, Logger } from '@nestjs/common';
import { HashService } from '@vubon/shared-kernel/infrastructure/security';
import type { PasswordHasherServiceInterface } from '../../../application/services/interfaces/password-hasher.service.interface.js';

@Injectable()
export class PasswordHasherService implements PasswordHasherServiceInterface {
  readonly name = 'PasswordHasherService';
  private readonly logger = new Logger(PasswordHasherService.name);

  constructor(private readonly hasher: HashService) {}

  async hash(plain: string): Promise<string> {
    return this.hasher.hash(plain);
  }

  async verify(plain: string, hash: string): Promise<boolean> {
    try {
      return await this.hasher.compare(plain, hash);
    } catch (err) {
      this.logger.warn(
        `verify failed: ${err instanceof Error ? err.message : 'unknown'}`,
      );
      return false;
    }
  }
}
