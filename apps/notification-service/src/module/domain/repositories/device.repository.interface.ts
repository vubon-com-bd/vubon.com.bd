import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DeviceEntity } from '../entities/device.entity';
import { DeviceIdVO } from '../value-objects/primitives/device-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface DeviceRepository extends BaseRepository<DeviceEntity, DeviceIdVO> {
  findByUser(userId: UserIdVO): Promise<readonly DeviceEntity[]>;
  findByFingerprint(fingerprint: string): Promise<DeviceEntity | null>;
  countByUser(userId: UserIdVO): Promise<number>;
  findOldest(userId: UserIdVO): Promise<DeviceEntity | null>;
}
