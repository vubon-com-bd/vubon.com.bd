/**
 * SsoLoginResponseDTO
 * @module auth-service/application/dtos/responses
 */
import type { UserResponseDTO } from './user-response.dto';
import type { AuthSessionResponseDTO } from './auth-session-response.dto';

export interface SsoLoginResponseDTO {
  readonly success: true;
  readonly user: UserResponseDTO;
  readonly session: AuthSessionResponseDTO;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly tokenType: 'Bearer';
  readonly expiresAt: number;
  readonly tenantId: string;
}
