/**
 * VendorVerificationMapper
 * @module vendor-service/application/mappers
 */
import type { VendorVerificationEntity } from '../../domain/entities/vendor-verification.entity.js';
import type { VendorVerificationResponseDto } from '../dtos/responses/vendor-verification-response.dto.js';

export class VendorVerificationMapper {
  static toResponse(entity: VendorVerificationEntity): VendorVerificationResponseDto {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      overallStatus: entity.overallStatus.value as VendorVerificationResponseDto['overallStatus'],
      checks: entity.checks.map((c) => ({
        type: c.type.value as VendorVerificationResponseDto['checks'][number]['type'],
        status: c.status.value as VendorVerificationResponseDto['checks'][number]['status'],
        verifiedAt: c.verifiedAt,
        expiresAt: c.expiresAt,
      })),
      submittedAt: entity.submittedAt,
      reviewedAt: entity.reviewedAt,
      expiresAt: entity.expiresAt,
      completionRatio: entity.getCompletionRatio(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toResponseList(
    entities: readonly VendorVerificationEntity[],
  ): readonly VendorVerificationResponseDto[] {
    return entities.map((e) => VendorVerificationMapper.toResponse(e));
  }
}
