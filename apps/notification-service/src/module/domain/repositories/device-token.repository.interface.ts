import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DeviceTokenEntity } from '../entities/device-token.entity';
import { DeviceIdVO } from '../value-objects/primitives/device-id.vo';
import { DeviceTokenVO } from '../value-objects/primitives/device-token.vo';

export interface DeviceTokenRepository extends BaseRepository<DeviceTokenEntity, string> {
  findByDeviceId(deviceId: DeviceIdVO): Promise<readonly DeviceTokenEntity[]>;
  findByToken(token: DeviceTokenVO): Promise<DeviceTokenEntity | null>;
  deleteByDeviceId(deviceId: DeviceIdVO): Promise<void>;
}
