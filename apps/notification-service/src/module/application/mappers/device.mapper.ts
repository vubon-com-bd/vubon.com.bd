import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { DeviceEntity } from '../../domain/entities/device.entity';
import type { DeviceResponseDTO } from '../dtos/responses/device-response.dto';

export class DeviceMapper extends BaseMapper<DeviceEntity, DeviceResponseDTO> {
  toTarget(source: DeviceEntity): DeviceResponseDTO {
    return {
      id: source.id.value,
      userId: source.userId.value,
      type: source.type.value,
      platform: source.platform.value,
      status: source.status.value,
      fingerprint: source.fingerprint,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
    };
  }

  toSource(target: DeviceResponseDTO): DeviceEntity {
    void target;
    throw new Error('DeviceMapper.toSource not supported');
  }
}
