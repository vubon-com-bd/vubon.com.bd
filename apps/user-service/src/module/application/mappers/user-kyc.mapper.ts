import { UserKycEntity } from '../../domain/entities/user-kyc.entity';
import type { KycResponseDTO } from '../dtos/responses/kyc-response.dto';

export class UserKycMapper {
  static toResponse(kyc: UserKycEntity): KycResponseDTO {
    return {
      success: true,
      kyc: {
        userId: kyc.userId.value,
        status: kyc.status.value,
        documents: [],
        submittedAt: kyc.submittedAt?.toISOString(),
        reviewedAt: kyc.reviewedAt?.toISOString(),
        rejectionReason: kyc.rejectionReason ?? undefined,
      },
    } as unknown as KycResponseDTO;
  }
}
