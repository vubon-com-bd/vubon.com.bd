/**
 * RefreshTokenResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface RefreshTokenResponseDTO {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly tokenType: 'Bearer';
  readonly expiresIn: number;
  readonly expiresAt: number;
}
