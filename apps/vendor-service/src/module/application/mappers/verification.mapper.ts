/**
 * VerificationMapper
 * @module vendor-service/application/mappers
 */
import type { VendorVerificationEntity } from '../../domain/entities/vendor-verification.entity.js';
import type {
  VerificationResponseDTO,
  VerificationSummaryResponseDTO,
  VerificationListResponseDTO,
} from '../dtos/responses/verification-response.dto.js';

export class VerificationMapper {
  static toResponse(entity: VendorVerificationEntity): VerificationResponseDTO {
    return {
      id: entity.id,
      vendorId: entity.vendorId.value,
      type: entity.type,
      status: entity.status.value,
      referenceId: entity.referenceId,
      submittedAt: entity.submittedAt,
      reviewedAt: entity.reviewedAt,
      reviewedBy: entity.reviewedBy,
      expiresAt: entity.expiresAt,
      rejectionReason: entity.rejectionReason,
      attempts: entity.attempts,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSummary(entity: VendorVerificationEntity): VerificationSummaryResponseDTO {
    return {
      id: entity.id,
      type: entity.type,
      status: entity.status.value,
      submittedAt: entity.submittedAt,
      expiresAt: entity.expiresAt,
    };
  }

  static toListResponse(
    entities: readonly VendorVerificationEntity[],
    total: number,
    page: number,
    limit: number,
  ): VerificationListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / Math.max(1, limit)),
    };
  }
}
