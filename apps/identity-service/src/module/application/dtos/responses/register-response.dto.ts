/**
 * Register Response DTO
 * @module identity-service/application/dtos/responses
 */
import type { UserPublicDTO } from './user-response.dto.js';
import type { AuthSessionResponseDTO } from './auth-session-response.dto.js';
import type { AuthTokenResponseDTO } from './auth-token-response.dto.js';

export interface RegisterResponseDTO {
  readonly success: true;
  readonly user: UserPublicDTO;
  readonly session?: AuthSessionResponseDTO;
  readonly tokens?: AuthTokenResponseDTO;
  readonly requiresVerification: boolean;
  readonly verificationChannel?: 'email' | 'phone' | 'both';
  readonly message: string;
}
