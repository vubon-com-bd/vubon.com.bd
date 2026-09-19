import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { AuthSessionEntity } from '../../domain/entities/auth-session.entity';
import type { AuthSessionResponseDTO } from '../dtos/responses/auth-session-response.dto';

export class AuthSessionMapper extends BaseMapper<
  AuthSessionEntity,
  AuthSessionResponseDTO
> {
  toTarget(source: AuthSessionEntity): AuthSessionResponseDTO {
    return {
      id: source.id,
      status: source.isActive ? 'active' : 'expired',
      ipAddress: source.ip,
      userAgent: source.userAgent,
      deviceId: source.deviceId ?? undefined,
      createdAt: source.createdAt,
      expiresAt: new Date(source.expiry.epochMs).toISOString(),
      lastAccessedAt: source.updatedAt,
      isCurrent: false,
    };
  }

  toSource(target: AuthSessionResponseDTO): AuthSessionEntity {
    void target;
    throw new Error('AuthSessionMapper.toSource not supported');
  }
}
