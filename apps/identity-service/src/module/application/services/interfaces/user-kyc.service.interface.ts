/**
 * User KYC Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserKycEntity } from '../../../domain/entities/user-kyc.entity.js';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto.js';
import type { SubmitKycRequestDTO } from '../../dtos/requests/user/submit-kyc.dto.js';

export const USER_KYC_SERVICE = Symbol('USER_KYC_SERVICE');

export interface UserKycServiceInterface extends BaseServiceInterface<UserKycEntity, string> {
  findForUser(userId: string): Promise<UserKycResponseDTO | null>;
  submit(userId: string, input: SubmitKycRequestDTO): Promise<UserKycResponseDTO>;
  verify(kycId: string, reviewedBy: string): Promise<UserKycResponseDTO>;
  reject(kycId: string, reason: string, reviewedBy: string): Promise<UserKycResponseDTO>;
}
