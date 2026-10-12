/**
 * VendorPayoutMapper
 * @module vendor-service/application/mappers
 */
import type { VendorPayoutEntity } from '../../domain/entities/vendor-payout.entity.js';
import type {
  VendorPayoutResponseDto,
  VendorPayoutPublicDto,
} from '../dtos/responses/vendor-payout-response.dto.js';

export class VendorPayoutMapper {
  static toResponse(entity: VendorPayoutEntity): VendorPayoutResponseDto {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      payoutNumber: entity.payoutNumber,
      status: entity.status.value as VendorPayoutResponseDto['status'],
      method: entity.method.value as VendorPayoutResponseDto['method'],
      cycle: entity.cycle.value as VendorPayoutResponseDto['cycle'],
      amount: entity.amount.amount,
      fee: entity.fee.amount,
      netAmount: entity.netAmount.amount,
      currency: entity.amount.currency,
      periodStart: '',
      periodEnd: '',
      transactionId: undefined,
      reference: undefined,
      notes: undefined,
      requestedAt: entity.requestedAt,
      approvedAt: undefined,
      paidAt: entity.paidAt,
      failedAt: undefined,
      failureReason: undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublic(entity: VendorPayoutEntity): VendorPayoutPublicDto {
    return {
      id: entity.id,
      payoutNumber: entity.payoutNumber,
      status: entity.status.value as VendorPayoutPublicDto['status'],
      method: entity.method.value as VendorPayoutPublicDto['method'],
      amount: entity.amount.amount,
      netAmount: entity.netAmount.amount,
      currency: entity.amount.currency,
      requestedAt: entity.requestedAt,
      paidAt: entity.paidAt,
    };
  }

  static toResponseList(entities: readonly VendorPayoutEntity[]): readonly VendorPayoutResponseDto[] {
    return entities.map((e) => VendorPayoutMapper.toResponse(e));
  }

  static toPublicList(entities: readonly VendorPayoutEntity[]): readonly VendorPayoutPublicDto[] {
    return entities.map((e) => VendorPayoutMapper.toPublic(e));
  }

  static toListResponse(
    entities: readonly VendorPayoutEntity[],
    total: number,
    page: number,
    limit: number,
  ) {
    return {
      items: entities.map((e) => VendorPayoutMapper.toPublic(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
