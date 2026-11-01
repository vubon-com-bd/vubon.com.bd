/**
 * CommissionMapper
 * @module vendor-service/application/mappers
 */
import type { VendorCommissionEntity } from '../../domain/entities/vendor-commission.entity.js';
import type {
  CommissionResponseDTO,
  CommissionSummaryResponseDTO,
  CommissionListResponseDTO,
} from '../dtos/responses/commission-response.dto.js';

export class CommissionMapper {
  static toResponse(entity: VendorCommissionEntity): CommissionResponseDTO {
    return {
      id: entity.id,
      vendorId: entity.vendorId.value,
      type: entity.type.value,
      rate: entity.rate.percent,
      fixedAmount: entity.fixedAmount,
      minAmount: entity.minAmount,
      maxAmount: entity.maxAmount,
      categoryOverrides: entity.vo.categoryOverrides,
      effectiveFrom: entity.effectiveFrom,
      effectiveTo: entity.effectiveTo,
      isActive: entity.isActive,
      isCurrentlyActive: entity.isCurrentlyActive(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSummary(entity: VendorCommissionEntity): CommissionSummaryResponseDTO {
    return {
      id: entity.id,
      type: entity.type.value,
      rate: entity.rate.percent,
      isCurrentlyActive: entity.isCurrentlyActive(),
      effectiveFrom: entity.effectiveFrom,
    };
  }

  static toListResponse(
    entities: readonly VendorCommissionEntity[],
    total: number,
    page: number,
    limit: number,
  ): CommissionListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / Math.max(1, limit)),
    };
  }
}
