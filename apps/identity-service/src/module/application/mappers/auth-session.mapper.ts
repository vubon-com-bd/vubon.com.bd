import type { SessionEntity } from '../../domain/entities/session.entity.js';
import type { AuthSessionResponseDTO } from '../dtos/responses/auth-session-response.dto.js';

export class AuthSessionMapper {
  static toDTO(entity: SessionEntity): AuthSessionResponseDTO {
    return {
      id: entity.id,
      userId: entity.userId.value,
      status: entity.status.value,
      ipAddress: entity.ipAddress?.value,
      userAgent: entity.userAgent?.value,
      deviceId: entity.deviceId?.value,
      createdAt: entity.createdAt,
      lastAccessedAt: entity.lastAccessedAt,
      expiresAt: new Date(entity.expiry.absoluteExpiresAt * 1000).toISOString(),
      isCurrent: false,
    };
  }
  static toDTOList(entities: readonly SessionEntity[]): readonly AuthSessionResponseDTO[] {
    return entities.map((e) => this.toDTO(e));
  }
}
