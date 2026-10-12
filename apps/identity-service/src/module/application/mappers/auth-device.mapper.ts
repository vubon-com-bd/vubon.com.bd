import type { DeviceEntity } from '../../domain/entities/device.entity.js';
import type { AuthDeviceResponseDTO } from '../dtos/responses/auth-device-response.dto.js';

export class AuthDeviceMapper {
  static toDTO(entity: DeviceEntity): AuthDeviceResponseDTO {
    return {
      id: entity.id,
      userId: entity.userId.value,
      type: entity.type.value,
      name: entity.name,
      os: entity.os,
      browser: entity.browser,
      trusted: entity.trusted,
      trustedUntil: entity.trustedUntil,
      lastActiveAt: entity.lastActiveAt,
      isCurrent: false,
    };
  }
  static toDTOList(entities: readonly DeviceEntity[]): readonly AuthDeviceResponseDTO[] {
    return entities.map((e) => this.toDTO(e));
  }
}
