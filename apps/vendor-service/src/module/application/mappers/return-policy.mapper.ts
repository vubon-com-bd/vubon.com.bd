/**
 * ReturnPolicyMapper
 * @module vendor-service/application/mappers
 */
import type { VendorReturnPolicyEntity } from '../../domain/entities/vendor-return-policy.entity.js';
import type { ReturnPolicyDTO } from '../services/interfaces/vendor-return-policy.service.interface.js';

export class ReturnPolicyMapper {
  static toResponse(entity: VendorReturnPolicyEntity): ReturnPolicyDTO {
    return {
      vendorId: entity.vendorId.value,
      type: entity.type.value,
      windowDays: entity.windowDays,
      isFreeReturn: entity.isFreeReturn,
      restockFeePercent: entity.restockFeePercent,
      requireReason: entity.requireReason,
      requireImages: entity.requireImages,
      maxImages: entity.maxImages,
      autoApprove: entity.autoApprove,
      approvalSlaHours: entity.approvalSlaHours,
      excludedCategories: entity.excludedCategories,
      windowLabel: entity.windowLabel,
    };
  }
}
