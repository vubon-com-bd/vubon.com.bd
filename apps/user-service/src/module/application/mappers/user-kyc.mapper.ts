/**
 * UserKycMapper
 */
import { UserKycEntity } from '@domain/entities/user-kyc.entity';
import type { KycResponseDTO } from '../dtos/responses/kyc-response.dto.js';

export class UserKycMapper {
  static toResponse(kyc: UserKycEntity): KycResponseDTO {
    return {
      userId: kyc.userId.value,
      status: kyc.status.value,
      level: kyc.isVerified() ? 1 : 0,
      documents: [],
      submittedAt: kyc.submittedAt?.toISOString(),
      reviewedAt: kyc.verifiedAt?.toISOString(),
      rejectionReason: kyc.rejectionReason ?? undefined,
      updatedAt: kyc.updatedAt,
    };
  }

  static toResponseList(
    kycs: readonly UserKycEntity[]
  ): readonly KycResponseDTO[] {
    return kycs.map((k) => UserKycMapper.toResponse(k));
  }
}
