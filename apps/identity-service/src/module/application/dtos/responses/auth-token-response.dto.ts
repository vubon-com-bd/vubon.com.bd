/**
 * Auth Token Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface AuthTokenResponseDTO {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly tokenType: 'Bearer';
  readonly expiresIn: number;
  readonly expiresAt: number;
  readonly scope?: readonly string[];
}
