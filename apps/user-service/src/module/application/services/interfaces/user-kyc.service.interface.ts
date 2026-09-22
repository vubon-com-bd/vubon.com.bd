import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserKycEntity } from '../../../domain/entities/user-kyc.entity';
import type { KycResponseDTO } from '../../dtos/responses/kyc-response.dto';

export interface UserKycServiceInterface
  extends BaseServiceInterface<UserKycEntity, string> {
  findByUserId(userId: string): Promise<KycResponseDTO | null>;
  submit(userId: string, input: Record<string, unknown>): Promise<KycResponseDTO>;
  verify(userId: string, kycId: string): Promise<KycResponseDTO>;
  reject(userId: string, kycId: string, reason: string): Promise<KycResponseDTO>;
}
