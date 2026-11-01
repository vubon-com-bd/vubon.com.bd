import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { Auth2FaServiceInterface } from '../interfaces/auth-2fa.service.interface.js';
import type { Auth2FaRepository } from '../../../domain/repositories/auth-2fa.repository.interface.js';
import { AUTH_2FA_REPOSITORY } from '../../../domain/repositories/auth-2fa.repository.interface.js';

@Injectable()
export class Auth2FaService extends BaseService implements Auth2FaServiceInterface {
  readonly name = 'Auth2FaService';
  constructor(@Inject(AUTH_2FA_REPOSITORY) private readonly repo: Auth2FaRepository) { super(); }
  async getConfig(authId: string) { return this.repo.findByAuthIdRaw(authId); }
  async setup(_authId: string, _method: string): Promise<{ secret: string; qrCodeUrl: string }> {
    return { secret: 'PENDING_SECRET', qrCodeUrl: 'otpauth://...' };
  }
  async verify(_authId: string, _code: string): Promise<boolean> { return false; }
  async enable(_authId: string): Promise<void> {}
  async disable(_authId: string): Promise<void> {}
}
