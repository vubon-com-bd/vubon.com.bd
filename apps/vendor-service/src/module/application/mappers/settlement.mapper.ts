/**
 * SettlementMapper
 * @module vendor-service/application/mappers
 */
import type { VendorSettlementEntity } from '../../domain/entities/vendor-settlement.entity.js';
import type {
  SettlementResponseDTO,
  SettlementSummaryResponseDTO,
  SettlementListResponseDTO,
} from '../dtos/responses/settlement-response.dto.js';

export class SettlementMapper {
  static toResponse(entity: VendorSettlementEntity): SettlementResponseDTO {
    return {
      id: entity.id,
      vendorId: entity.vendorId.value,
      status: entity.status.value,
      periodStart: entity.periodStart,
      periodEnd: entity.periodEnd,
      grossAmount: entity.grossAmount,
      commissionAmount: entity.commissionAmount,
      refundAmount: entity.refundAmount,
      adjustmentAmount: entity.adjustmentAmount,
      netAmount: entity.netAmount,
      currency: entity.currency,
      orderCount: entity.orderCount,
      payoutId: entity.payoutId,
      processedAt: entity.vo.processedAt,
      completedAt: entity.completedAt,
      failedReason: entity.failedReason,
      notes: entity.vo.notes,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSummary(entity: VendorSettlementEntity): SettlementSummaryResponseDTO {
    return {
      id: entity.id,
      netAmount: entity.netAmount,
      currency: entity.currency,
      status: entity.status.value,
      periodStart: entity.periodStart,
      periodEnd: entity.periodEnd,
      createdAt: entity.createdAt,
    };
  }

  static toListResponse(
    entities: readonly VendorSettlementEntity[],
    total: number,
    page: number,
    limit: number,
  ): SettlementListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / Math.max(1, limit)),
    };
  }
}
