/**
 * SocialLoginResponseDTO
 * @module auth-service/application/dtos/responses
 */
import type { UserResponseDTO } from './user-response.dto';
import type { AuthSessionResponseDTO } from './auth-session-response.dto';

export interface SocialLoginResponseDTO {
  readonly success: true;
  readonly isNewUser: boolean;
  readonly user: UserResponseDTO;
  readonly session: AuthSessionResponseDTO;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly tokenType: 'Bearer';
  readonly expiresAt: number;
}
