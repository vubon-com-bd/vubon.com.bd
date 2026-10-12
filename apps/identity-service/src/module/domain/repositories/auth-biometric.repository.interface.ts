/**
 * Auth Biometric Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { AuthBiometricEntity } from '../entities/auth-biometric.entity.js';
import type { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';

export const AUTH_BIOMETRIC_REPOSITORY = Symbol('AUTH_BIOMETRIC_REPOSITORY');

export interface AuthBiometricRepository extends BaseRepository<AuthBiometricEntity, string> {
  findByAuthId(authId: AuthIdVO): Promise<readonly AuthBiometricEntity[]>;
  findByAuthIdRaw(authId: string): Promise<readonly AuthBiometricEntity[]>;
  findByAuthIdAndDevice(authId: AuthIdVO, deviceId: string): Promise<AuthBiometricEntity | null>;

  // Cron support
  findStale(inactiveDays: number): Promise<readonly AuthBiometricEntity[]>;

  softDelete(id: string): Promise<void>;
}
