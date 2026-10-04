/**
 * KycControllerMapper
 */
import type {
  SubmitKycRequestDto,
  RejectKycRequestDto,
} from '../dtos/requests/kyc.request.dto.js';
import {
  KycResponseDto,
  KycListResponseDto,
} from '../dtos/responses/kyc.response.dto.js';
import type { SubmitKycRequestDTO } from '@application/dtos/requests/kyc';
import type { KycResponseDTO } from '@application/dtos/responses/kyc-response.dto';

export class KycControllerMapper {
  static toSubmitAppDto(userId: string, dto: SubmitKycRequestDto): SubmitKycRequestDTO {
    return {
      userId,
      documents: dto.documents.map((d) => ({
        type: d.type,
        number: d.number,
        frontUrl: d.frontUrl,
        backUrl: d.backUrl,
        selfieUrl: d.selfieUrl,
      })),
      acceptTerms: true,
    };
  }

  static toRejectAppDto(kycId: string, dto: RejectKycRequestDto) {
    return {
      kycId,
      reason: dto.reason,
      rejectedBy: 'system',
    };
  }

  static toResponse(app: KycResponseDTO): KycResponseDto {
    const res = new KycResponseDto();
    res.userId = app.userId;
    res.status = app.status;
    res.level = app.level;
    res.documents = app.documents.map((d) => ({
      id: d.id,
      type: d.type,
      number: d.number,
      frontUrl: d.frontUrl,
      backUrl: d.backUrl,
      selfieUrl: d.selfieUrl,
      verified: d.verified,
      uploadedAt: d.uploadedAt,
    }));
    res.submittedAt = app.submittedAt;
    res.reviewedAt = app.reviewedAt;
    res.reviewedBy = app.reviewedBy;
    res.rejectionReason = app.rejectionReason;
    res.expiresAt = app.expiresAt;
    res.updatedAt = app.updatedAt;
    return res;
  }

  static toListResponse(apps: readonly KycResponseDTO[]): KycListResponseDto {
    const res = new KycListResponseDto();
    res.items = apps.map((a) => KycControllerMapper.toResponse(a));
    res.total = apps.length;
    return res;
  }
}
