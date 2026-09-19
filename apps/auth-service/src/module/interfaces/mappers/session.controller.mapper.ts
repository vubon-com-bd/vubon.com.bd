import { Injectable } from '@nestjs/common';
import type { AuthSessionResponseDTO } from '../../application/dtos/responses/auth-session-response.dto';
import type { SessionResponseDTO } from '../dtos/responses/session.response.dto';

@Injectable()
export class SessionControllerMapper {
  toSessionResponse(dto: AuthSessionResponseDTO): SessionResponseDTO {
    return {
      id: dto.id,
      status: dto.status,
      ipAddress: dto.ipAddress,
      userAgent: dto.userAgent,
      deviceId: dto.deviceId,
      createdAt: dto.createdAt,
      expiresAt: dto.expiresAt,
      lastAccessedAt: dto.lastAccessedAt,
      isCurrent: dto.isCurrent,
    };
  }
}
