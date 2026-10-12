/**
 * AuthSessionControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { AuthSessionResponseDTO } from '../../application/dtos/responses/auth-session-response.dto.js';
import type { AuthSessionPublicHttpResponseDTO } from '../dtos/responses/session/session-public.response.dto.js';
import type { SessionListHttpResponseDTO } from '../dtos/responses/session/session-list.response.dto.js';
import type { SessionRevokeHttpResponseDTO } from '../dtos/responses/session/session-revoke.response.dto.js';

export class AuthSessionControllerMapper {
  static toHttpResponse(app: AuthSessionResponseDTO): AuthSessionPublicHttpResponseDTO {
    return {
      id: app.id,
      userId: app.userId,
      status: app.status,
      ipAddress: app.ipAddress,
      userAgent: app.userAgent,
      deviceId: app.deviceId,
      createdAt: app.createdAt,
      lastAccessedAt: app.lastAccessedAt,
      expiresAt: app.expiresAt,
      isCurrent: app.isCurrent,
    };
  }

  static toHttpList(
    items: readonly AuthSessionResponseDTO[],
  ): SessionListHttpResponseDTO {
    return {
      success: true,
      sessions: items.map((i) => this.toHttpResponse(i)),
      total: items.length,
    };
  }

  static toRevokeHttp(revokedCount: number): SessionRevokeHttpResponseDTO {
    return {
      success: true,
      revokedCount,
      revokedAt: new Date().toISOString(),
    };
  }
}
