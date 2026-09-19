import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { AuthDeviceEntity } from '../../domain/entities/auth-device.entity';
import type { AuthDeviceResponseDTO } from '../dtos/responses/auth-device-response.dto';

export class AuthDeviceMapper extends BaseMapper<
  AuthDeviceEntity,
  AuthDeviceResponseDTO
> {
  toTarget(source: AuthDeviceEntity): AuthDeviceResponseDTO {
    return {
      id: source.id,
      type: source.type.value,
      name: source.name ?? undefined,
      trusted: source.isTrusted,
      lastActiveAt: source.lastSeenAt.toISOString(),
      createdAt: source.createdAt,
      isCurrent: false,
    };
  }

  toSource(target: AuthDeviceResponseDTO): AuthDeviceEntity {
    void target;
    throw new Error('AuthDeviceMapper.toSource not supported');
  }
}
