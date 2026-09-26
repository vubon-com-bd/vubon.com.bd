/**
 * AuthBiometricRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { AuthBiometricEntity, BiometricKind } from '../entities/auth-biometric.entity';
import { BiometricIdVO } from '../value-objects/primitives/biometric-id.vo';

export interface AuthBiometricRepository
  extends BaseRepository<AuthBiometricEntity, string> {
  findByUser(userId: UserId): Promise<readonly AuthBiometricEntity[]>;
  findByBiometricId(
    biometricId: BiometricIdVO,
  ): Promise<AuthBiometricEntity | null>;
  findByUserAndKind(
    userId: UserId,
    kind: BiometricKind,
  ): Promise<readonly AuthBiometricEntity[]>;
}
