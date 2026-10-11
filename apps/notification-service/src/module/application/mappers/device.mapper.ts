/**
 * DeviceMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { DeviceEntity } from '../../domain/entities/device.entity.js';
import type {
  DeviceResponseDTO,
  DeviceListResponseDTO,
} from '../dtos/responses/device-response.dto.js';
import type {
  NotificationDeviceTypeValue,
  NotificationDeviceStatusValue,
} from '@vubon/shared-types/platform/notification';

export class DeviceMapper {
  static toResponse(entity: DeviceEntity): DeviceResponseDTO {
    return {
      id: entity.id,
      userId: entity.userId,
      type: entity.type.value as NotificationDeviceTypeValue,
      status: entity.status.value as NotificationDeviceStatusValue,
      token: entity.token.masked(),
      maskedToken: entity.token.masked(),
      platform: entity.platform,
      appVersion: entity.appVersion,
      osVersion: entity.osVersion,
      lastActiveAt: entity.lastActiveAt,
      registeredAt: entity.registeredAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toListResponse(
    entities: readonly DeviceEntity[],
    total: number,
    page: number,
    limit: number,
  ): DeviceListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
