import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserKycEntity } from '../../../domain/entities/user-kyc.entity';
import type { SubmitKycRequestDTO } from '../../dtos/requests/user/submit-kyc.dto';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto';

export interface UserKycServiceInterface
  extends BaseServiceInterface<UserKycEntity, string> {
  findByUserId(userId: string): Promise<UserKycResponseDTO | null>;
  submit(userId: string, input: SubmitKycRequestDTO): Promise<UserKycResponseDTO>;
  verify(userId: string, kycId: string): Promise<UserKycResponseDTO>;
  reject(userId: string, kycId: string, reason: string): Promise<UserKycResponseDTO>;
}
