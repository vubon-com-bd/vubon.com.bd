/**
 * LoginResponseDTO — Result of a successful login
 * @module auth-service/application/dtos/responses
 *
 * NOTE: Token fields are flat (matching LoginResponseSchema), not nested.
 */
import type { UserResponseDTO } from './user-response.dto';
import type { AuthSessionResponseDTO } from './auth-session-response.dto';

export interface LoginResponseDTO {
  readonly success: true;
  readonly user: UserResponseDTO;
  readonly session: AuthSessionResponseDTO;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly tokenType: 'Bearer';
  readonly expiresAt: number;
  readonly requiresMfa?: boolean;
  readonly requiresVerification?: boolean;
  readonly challengeId?: string;
}

export interface LoginMfaRequiredResponseDTO {
  readonly success: true;
  readonly requiresMfa: true;
  readonly challengeId: string;
  readonly mfaMethods: readonly string[];
  readonly expiresAt: string;
}
