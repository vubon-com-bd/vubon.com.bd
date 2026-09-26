/**
 * AuthSessionMapper
 * @module auth-service/application/mappers
 */
import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { AuthSessionEntity } from '../../domain/entities/auth-session.entity';
import type { AuthSessionResponseDTO } from '../dtos/responses/auth-session-response.dto';

export class AuthSessionMapper
  extends BaseMapper<AuthSessionEntity, AuthSessionResponseDTO> {
  toTarget(session: AuthSessionEntity): AuthSessionResponseDTO {
    const now = Date.now();
    return {
      sessionId: session.id,
      userId: session.userId,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
      deviceId: session.deviceId,
      createdAt: session.createdAt,
      expiresAt: session.expiry.toISOString(),
      revokedAt: session.revokedAt
        ? new Date(session.revokedAt).toISOString()
        : undefined,
      isActive: session.isActive(now),
    };
  }

  toSource(_dto: AuthSessionResponseDTO): AuthSessionEntity {
    throw new Error('AuthSessionMapper.toSource is not supported');
  }
}
