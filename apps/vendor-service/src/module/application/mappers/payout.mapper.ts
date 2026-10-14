/**
 * PayoutMapper
 * @module vendor-service/application/mappers
 */
import type { VendorPayoutEntity } from '../../domain/entities/vendor-payout.entity.js';
import type {
  PayoutResponseDTO,
  PayoutPublicResponseDTO,
  PayoutSummaryResponseDTO,
  PayoutListResponseDTO,
} from '../dtos/responses/payout-response.dto.js';

export class PayoutMapper {
  static toResponse(entity: VendorPayoutEntity): PayoutResponseDTO {
    return {
      id: entity.id,
      vendorId: entity.vendorId.value,
      bankAccountId: entity.bankAccountId.value,
      amount: entity.amount.amount,
      fee: entity.fee,
      netAmount: entity.netAmount,
      currency: entity.currency,
      method: entity.method,
      status: entity.status.value,
      requestedAt: entity.requestedAt,
      processedAt: entity.processedAt,
      paidAt: entity.paidAt,
      transactionId: entity.transactionId,
      rejectionReason: entity.rejectionReason,
      failureReason: entity.failureReason,
      notes: entity.vo.notes,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: VendorPayoutEntity): PayoutPublicResponseDTO {
    return {
      id: entity.id,
      amount: entity.amount.amount,
      netAmount: entity.netAmount,
      currency: entity.currency,
      status: entity.status.value,
      requestedAt: entity.requestedAt,
      paidAt: entity.paidAt,
    };
  }

  static toSummary(entity: VendorPayoutEntity): PayoutSummaryResponseDTO {
    return {
      id: entity.id,
      amount: entity.amount.amount,
      currency: entity.currency,
      status: entity.status.value,
      method: entity.method,
      requestedAt: entity.requestedAt,
      createdAt: entity.createdAt,
    };
  }

  static toListResponse(
    entities: readonly VendorPayoutEntity[],
    total: number,
    page: number,
    limit: number,
  ): PayoutListResponseDTO {
    const totalPages = Math.ceil(total / Math.max(1, limit));
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }
}
