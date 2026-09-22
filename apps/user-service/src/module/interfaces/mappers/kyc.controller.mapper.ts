import { Injectable } from '@nestjs/common';
import type { KycResponseDTO } from '../../application/dtos/responses/kyc-response.dto';
import type { KycResponseDto } from '../dtos/responses/kyc.response.dto';

@Injectable()
export class KycControllerMapper {
  toResponse(appDto: KycResponseDTO): KycResponseDto {
    const k = appDto.kyc;
    return {
      userId: k.userId,
      status: k.status,
      documents: k.documents as unknown as ReadonlyArray<Record<string, unknown>>,
      submittedAt: k.submittedAt ?? undefined,
      reviewedAt: k.reviewedAt ?? undefined,
      rejectionReason: k.rejectionReason ?? undefined,
      updatedAt: k.updatedAt,
    };
  }
}
