/**
 * Verification Response DTOs
 * @module payment-service/application/dtos/responses
 */
import type { VerificationStatusValue } from '@domain/primitives/verification-status.vo';

export interface VerificationResponseDTO {
  readonly id: string;
  readonly paymentId: string;
  readonly status: VerificationStatusValue;
  readonly method: string;
  readonly attempts: number;
  readonly expiresAt: string;
  readonly verifiedAt?: string;
  readonly failureReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface VerificationInitiateResponseDTO {
  readonly success: true;
  readonly verificationId: string;
  readonly status: VerificationStatusValue;
  readonly expiresAt: string;
}
