/**
 * MfaValidatorService — TOTP code verification
 * @module auth-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { TotpService } from './totp.service';
import { MfaInvalidError } from '../../../domain/errors/mfa.errors';

@Injectable()
export class MfaValidatorService {
  readonly name = 'MfaValidatorService';

  constructor(private readonly totp: TotpService) {}

  async validate(secret: string, code: string): Promise<void> {
    const ok = await this.totp.verify({ secret, code, window: 1 });
    if (!ok) throw new MfaInvalidError('Invalid TOTP code');
  }

  async isValid(secret: string, code: string): Promise<boolean> {
    return this.totp.verify({ secret, code, window: 1 });
  }
}
