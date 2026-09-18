import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthDeviceEntity } from '../entities/auth-device.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { DeviceFingerprintVO } from '../value-objects/primitives/device-fingerprint.vo';

export interface AuthDeviceRepository
  extends BaseRepository<AuthDeviceEntity, string> {
  findByUser(userId: UserIdVO): Promise<readonly AuthDeviceEntity[]>;
  findByFingerprint(
    fingerprint: DeviceFingerprintVO,
  ): Promise<AuthDeviceEntity | null>;
}
