/**
 * AuthDeviceControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { AuthDeviceResponseDTO } from '../../application/dtos/responses/auth-device-response.dto.js';
import type { DeviceHttpResponseDTO } from '../dtos/responses/device/device.response.dto.js';
import type { DeviceListHttpResponseDTO } from '../dtos/responses/device/device-list.response.dto.js';

export class AuthDeviceControllerMapper {
  static toHttpResponse(app: AuthDeviceResponseDTO): DeviceHttpResponseDTO {
    return {
      id: app.id,
      userId: app.userId,
      type: app.type,
      name: app.name,
      os: app.os,
      browser: app.browser,
      trusted: app.trusted,
      trustedUntil: app.trustedUntil,
      lastActiveAt: app.lastActiveAt,
      isCurrent: app.isCurrent,
    };
  }

  static toHttpList(items: readonly AuthDeviceResponseDTO[]): DeviceListHttpResponseDTO {
    return {
      success: true,
      devices: items.map((i) => this.toHttpResponse(i)),
      total: items.length,
    };
  }
}
