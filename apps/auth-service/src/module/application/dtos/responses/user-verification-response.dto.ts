/**
 * UserVerificationResponseDTO
 * @module auth-service/application/dtos/responses
 */
export type VerificationStatusValue =
  | 'pending'
  | 'verified'
  | 'rejected'
  | 'expired';

export interface UserVerificationResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly status: VerificationStatusValue;
  readonly expiresAt: string;
  readonly createdAt: string;
  readonly completedAt?: string;
}
