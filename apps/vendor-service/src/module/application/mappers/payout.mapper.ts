import { VendorPayoutEntity } from '../../domain/entities/vendor-payout.entity';
import type { PayoutResponseDto } from '../dtos/responses/payout-response.dto';

export class PayoutMapper {
  static toDto(entity: VendorPayoutEntity): PayoutResponseDto {
    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      bankAccountId: entity.bankAccountId.value,
      amount: entity.amount.amount,
      currency: entity.amount.currency,
      status: entity.status.value,
      requestedAt: entity.requestedAt.toISOString(),
      processedAt: entity.processedAt?.toISOString() ?? null,
      failureReason: entity.failureReason,
    };
  }
}
