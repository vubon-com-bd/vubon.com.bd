import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { DeviceTokenEntity } from '../../../domain/entities/device-token.entity';

export interface DeviceTokenServiceInterface
  extends BaseServiceInterface<DeviceTokenEntity, string> {
  findByDeviceId(deviceId: string): Promise<readonly DeviceTokenEntity[]>;
  findByToken(token: string): Promise<DeviceTokenEntity | null>;
  updateToken(deviceId: string, token: string): Promise<void>;
}
