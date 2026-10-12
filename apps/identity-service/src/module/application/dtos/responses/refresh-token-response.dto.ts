/**
 * Refresh Token Response DTO
 * @module identity-service/application/dtos/responses
 */
import type { AuthTokenResponseDTO } from './auth-token-response.dto.js';

export interface RefreshTokenResponseDTO {
  readonly success: true;
  readonly tokens: AuthTokenResponseDTO;
}
