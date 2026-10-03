/**
 * AuthDeviceRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { AuthDeviceEntity } from '../entities/auth-device.entity.js';
import { DeviceFingerprintVO } from '../value-objects/primitives/device-fingerprint.vo.js';

export interface AuthDeviceRepository extends BaseRepository<AuthDeviceEntity, string> {
  findByUser(userId: UserId): Promise<readonly AuthDeviceEntity[]>;
  findByFingerprint(
    userId: UserId,
    fingerprint: DeviceFingerprintVO,
  ): Promise<AuthDeviceEntity | null>;
  countTrustedByUser(userId: UserId): Promise<number>;
}
