/**
 * Auth 2FA Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthTwoFactorEntity } from '../../../domain/entities/auth-2fa.entity.js';

export const AUTH_2FA_SERVICE = Symbol('AUTH_2FA_SERVICE');

export interface Auth2FaServiceInterface extends BaseServiceInterface<AuthTwoFactorEntity, string> {
  getConfig(authId: string): Promise<AuthTwoFactorEntity | null>;
  setup(authId: string, method: string): Promise<{ secret: string; qrCodeUrl: string }>;
  verify(authId: string, code: string): Promise<boolean>;
  enable(authId: string): Promise<void>;
  disable(authId: string): Promise<void>;
}
