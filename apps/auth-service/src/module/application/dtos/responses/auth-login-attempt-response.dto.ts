/**
 * AuthLoginAttemptResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface AuthLoginAttemptResponseDTO {
  readonly id: string;
  readonly userId?: string;
  readonly email?: string;
  readonly ipMasked: string;
  readonly userAgent: string;
  readonly status: string;
  readonly attemptedAt: string;
  readonly failureReason?: string;
}
