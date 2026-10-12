/**
 * Auth Login Attempt Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface AuthLoginAttemptResponseDTO {
  readonly id: string;
  readonly identifier: string;
  readonly status: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly failureReason?: string;
  readonly attemptedAt: string;
}
