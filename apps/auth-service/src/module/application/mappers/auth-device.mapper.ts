/**
 * AuthDeviceMapper
 * @module auth-service/application/mappers
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { AuthDeviceEntity } from '../../domain/entities/auth-device.entity';
import type { AuthDeviceResponseDTO } from '../dtos/responses/auth-device-response.dto';

export class AuthDeviceMapper
  extends OneWayMapper<AuthDeviceEntity, AuthDeviceResponseDTO> {
  map(device: AuthDeviceEntity): AuthDeviceResponseDTO {
    return {
      id: device.id,
      userId: device.userId,
      name: device.name,
      type: device.type.value,
      status: device.status.value,
      fingerprintMasked: device.fingerprint.masked,
      firstSeenAt: new Date(device.createdAt).toISOString(),
      lastSeenAt: new Date(device.lastSeenAt).toISOString(),
      isTrusted: device.isTrusted(),
    };
  }
}
