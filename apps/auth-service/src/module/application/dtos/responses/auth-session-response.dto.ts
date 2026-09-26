/**
 * AuthSessionResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface AuthSessionResponseDTO {
  readonly sessionId: string;
  readonly userId: string;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly deviceId?: string;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly revokedAt?: string;
  readonly isActive: boolean;
}
