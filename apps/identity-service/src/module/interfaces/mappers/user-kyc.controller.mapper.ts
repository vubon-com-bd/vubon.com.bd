/**
 * UserKycControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { SubmitKycHttpDTO } from '../dtos/requests/user/submit-kyc.request.dto.js';
import type { VerifyKycHttpDTO } from '../dtos/requests/user/verify-kyc.request.dto.js';
import type { RejectKycHttpDTO } from '../dtos/requests/user/reject-kyc.request.dto.js';
import type { UserKycHttpResponseDTO } from '../dtos/responses/user-kyc/user-kyc.response.dto.js';

export class UserKycControllerMapper {
  static toSubmitAppDto(dto: SubmitKycHttpDTO): unknown {
    return { documents: dto.documents };
  }

  static toVerifyAppDto(dto: VerifyKycHttpDTO): { kycId: string } {
    return { kycId: dto.kycId };
  }

  static toRejectAppDto(dto: RejectKycHttpDTO): { kycId: string; reason: string } {
    return { kycId: dto.kycId, reason: dto.reason };
  }

  static toHttpResponse(app: unknown): UserKycHttpResponseDTO {
    return app as UserKycHttpResponseDTO;
  }
}
