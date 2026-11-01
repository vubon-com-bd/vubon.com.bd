/**
 * User Verification Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserVerificationEntity } from '../../../domain/entities/user-verification.entity.js';
import type { UserVerificationResponseDTO } from '../../dtos/responses/user-verification-response.dto.js';

export const USER_VERIFICATION_SERVICE = Symbol('USER_VERIFICATION_SERVICE');

export interface UserVerificationServiceInterface extends BaseServiceInterface<UserVerificationEntity, string> {
  findForUser(userId: string): Promise<UserVerificationResponseDTO | null>;
  verifyEmail(userId: string): Promise<void>;
  verifyPhone(userId: string): Promise<void>;
  verifyIdentity(userId: string): Promise<void>;
  verifyAddress(userId: string): Promise<void>;
}
