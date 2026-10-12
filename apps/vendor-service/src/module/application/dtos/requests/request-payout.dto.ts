/**
 * RequestPayoutRequestDto — vendor initiates a payout
 * @module vendor-service/application/dtos/requests
 */
import type { VENDOR_PAYOUT_METHOD } from '@vubon/shared-constants/business';

export class RequestPayoutRequestDto {
  vendorId!: string;
  amount!: number;
  currency!: string;
  method?: (typeof VENDOR_PAYOUT_METHOD)[keyof typeof VENDOR_PAYOUT_METHOD];
  bankAccountId?: string;
  notes?: string;
  idempotencyKey!: string;
}
