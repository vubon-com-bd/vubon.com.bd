/**
 * DeviceMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { DeviceEntity } from '@domain/entities/device.entity.js';
import type {
  DeviceResponseDTO,
  DeviceSummaryResponseDTO,
  DeviceListResponseDTO,
} from '@application/dtos/responses/device-response.dto.js';

export class DeviceMapper {
  static toResponse(entity: DeviceEntity): DeviceResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      userId: vo.userId.value,
      type: vo.type.value as never,
      status: vo.status.value as never,
      tokenMasked: vo.token.masked,
      platform: vo.platform.value,
      appVersion: vo.appVersion,
      osVersion: vo.osVersion,
      deviceName: vo.deviceName,
      lastActiveAt: vo.lastActiveAt,
      registeredAt: vo.registeredAt,
    };
  }

  static toSummary(entity: DeviceEntity): DeviceSummaryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      type: vo.type.value as never,
      status: vo.status.value as never,
      deviceName: vo.deviceName,
      lastActiveAt: vo.lastActiveAt,
    };
  }

  static toListResponse(
    entities: readonly DeviceEntity[],
    total: number,
  ): DeviceListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
    };
  }
}
