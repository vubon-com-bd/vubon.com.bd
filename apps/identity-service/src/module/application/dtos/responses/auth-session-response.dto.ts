/**
 * Auth Session Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface AuthSessionResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly status: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly createdAt: string;
  readonly lastAccessedAt: string;
  readonly expiresAt: string;
  readonly isCurrent: boolean;
}
