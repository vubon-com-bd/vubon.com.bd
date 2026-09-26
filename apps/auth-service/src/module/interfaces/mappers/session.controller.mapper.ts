/**
 * SessionControllerMapper
 * @module auth-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { AuthSessionResponseDTO as AppSessionResponse } from '../../application/dtos/responses/auth-session-response.dto';
import type { SessionResponseDTO } from '../dtos/responses/session.response.dto';

@Injectable()
export class SessionControllerMapper {
  toResponse(source: AppSessionResponse): SessionResponseDTO {
    return {
      sessionId: source.sessionId,
      userId: source.userId,
      ipAddress: source.ipAddress,
      userAgent: source.userAgent,
      deviceId: source.deviceId,
      createdAt: source.createdAt,
      expiresAt: source.expiresAt,
      revokedAt: source.revokedAt,
      isActive: source.isActive,
    };
  }

  toResponseList(
    sources: readonly AppSessionResponse[],
  ): readonly SessionResponseDTO[] {
    return sources.map((s) => this.toResponse(s));
  }
}
