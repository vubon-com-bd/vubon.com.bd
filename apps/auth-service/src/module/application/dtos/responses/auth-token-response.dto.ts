/**
 * AuthTokenResponseDTO — Issued token bundle (only sent once)
 * @module auth-service/application/dtos/responses
 */
export interface AuthTokenResponseDTO {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly tokenType: 'Bearer';
  readonly expiresIn: number;       // seconds
  readonly expiresAt: number;       // epoch ms
  readonly scope?: string;
}
