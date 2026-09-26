import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { DeviceEntity } from '../../../domain/entities/device.entity';
import type { DeviceResponseDTO } from '../../dtos/responses/device-response.dto';

export interface DeviceServiceInterface
  extends BaseServiceInterface<DeviceEntity, string> {
  findById(id: string): Promise<DeviceResponseDTO | null>;
  findByUser(userId: string): Promise<readonly DeviceResponseDTO[]>;
  register(userId: string, type: string, platform: string, token: string, fingerprint?: string): Promise<DeviceResponseDTO>;
  unregister(deviceId: string): Promise<void>;
}
