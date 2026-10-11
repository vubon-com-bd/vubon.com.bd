/**
 * DeviceControllerMapper
 * @module notification-service/interfaces/mappers
 */
import type {
  RegisterDeviceHttpDTO,
  UpdateDeviceHttpDTO,
  RefreshDeviceTokenHttpDTO,
  RemoveDeviceHttpDTO,
  BlockDeviceHttpDTO,
  ListDevicesHttpQueryDTO,
} from '../dtos/requests/device/device.http-dto.js';
import type {
  RegisterDeviceRequestDTO,
  UpdateDeviceRequestDTO,
  RefreshDeviceTokenRequestDTO,
  RemoveDeviceRequestDTO,
  BlockDeviceRequestDTO,
  ListDevicesRequestDTO,
} from '../../application/dtos/requests/device/device.dto.js';

export class DeviceControllerMapper {
  static toRegisterAppDto(dto: RegisterDeviceHttpDTO): RegisterDeviceRequestDTO {
    return {
      userId: dto.userId,
      type: dto.type as never,
      token: dto.token,
      platform: dto.platform,
      appVersion: dto.appVersion,
      osVersion: dto.osVersion,
      deviceName: dto.deviceName,
    };
  }

  static toUpdateAppDto(deviceId: string, dto: UpdateDeviceHttpDTO): UpdateDeviceRequestDTO {
    return {
      deviceId,
      token: dto.token,
      appVersion: dto.appVersion,
      osVersion: dto.osVersion,
      deviceName: dto.deviceName,
    };
  }

  static toRefreshAppDto(deviceId: string, dto: RefreshDeviceTokenHttpDTO): RefreshDeviceTokenRequestDTO {
    return { deviceId, newToken: dto.newToken };
  }

  static toRemoveAppDto(deviceId: string, dto: RemoveDeviceHttpDTO): RemoveDeviceRequestDTO {
    return { deviceId, reason: dto.reason };
  }

  static toBlockAppDto(deviceId: string, dto: BlockDeviceHttpDTO): BlockDeviceRequestDTO {
    return { deviceId, reason: dto.reason };
  }

  static toListAppDto(q: ListDevicesHttpQueryDTO, userId?: string): ListDevicesRequestDTO {
    return {
      userId: q.userId ?? userId,
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: q.sortBy as never,
      sortDir: q.sortDir,
    };
  }
}
