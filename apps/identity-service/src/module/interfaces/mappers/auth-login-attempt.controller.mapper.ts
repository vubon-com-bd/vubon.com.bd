/**
 * AuthLoginAttemptControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { AuthLoginAttemptResponseDTO } from '../../application/dtos/responses/auth-login-attempt-response.dto.js';
import type { LoginAttemptHttpResponseDTO } from '../dtos/responses/login-attempt/login-attempt.response.dto.js';

export class AuthLoginAttemptControllerMapper {
  static toHttpResponse(app: AuthLoginAttemptResponseDTO): LoginAttemptHttpResponseDTO {
    return {
      id: app.id,
      identifier: app.identifier,
      status: app.status,
      ipAddress: app.ipAddress,
      userAgent: app.userAgent,
      failureReason: app.failureReason,
      attemptedAt: app.attemptedAt,
    };
  }

  static toHttpList(items: readonly AuthLoginAttemptResponseDTO[]): readonly LoginAttemptHttpResponseDTO[] {
    return items.map((i) => this.toHttpResponse(i));
  }
}
