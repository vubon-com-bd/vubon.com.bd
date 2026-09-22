import { VendorCommissionEntity } from '../../domain/entities/vendor-commission.entity';
import type { CommissionResponseDto } from '../dtos/responses/commission-response.dto';

export class CommissionMapper {
  static toDto(entity: VendorCommissionEntity): CommissionResponseDto {
    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      orderId: entity.orderId.value,
      rate: entity.rate.numeric,
      type: entity.type.value,
      orderAmount: entity.orderAmount.amount,
      commissionAmount: entity.commissionAmount.amount,
      currency: entity.orderAmount.currency,
      isSettled: entity.isSettled,
      calculatedAt: entity.createdAt,
    };
  }
}
