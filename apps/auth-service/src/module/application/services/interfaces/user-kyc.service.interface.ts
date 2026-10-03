/**
 * UserKycServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { UserKycEntity } from '../../../domain/entities/user-kyc.entity.js';
import type { SubmitKycRequestDTO } from '../../dtos/requests/user/submit-kyc.dto.js';
import type { VerifyKycRequestDTO } from '../../dtos/requests/user/verify-kyc.dto.js';
import type { RejectKycRequestDTO } from '../../dtos/requests/user/reject-kyc.dto.js';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto.js';

export interface UserKycServiceInterface
  extends BaseServiceInterface<UserKycEntity, string> {
  submit(userId: UserId, input: SubmitKycRequestDTO): Promise<UserKycEntity>;

  approve(input: VerifyKycRequestDTO): Promise<UserKycEntity>;

  reject(input: RejectKycRequestDTO): Promise<UserKycEntity>;

  getByUserId(userId: UserId): Promise<UserKycEntity | null>;

  listPending(): Promise<readonly UserKycEntity[]>;

  toResponse(kyc: UserKycEntity): UserKycResponseDTO;
}
