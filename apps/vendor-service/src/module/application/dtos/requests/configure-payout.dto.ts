/**
 * ConfigurePayoutRequestDto — set payout method & cycle
 * @module vendor-service/application/dtos/requests
 */
import type {
  VENDOR_PAYOUT_METHOD,
  VENDOR_PAYOUT_CYCLE,
} from '@vubon/shared-constants/business';

export class ConfigurePayoutRequestDto {
  vendorId!: string;
  method!: (typeof VENDOR_PAYOUT_METHOD)[keyof typeof VENDOR_PAYOUT_METHOD];
  cycle!: (typeof VENDOR_PAYOUT_CYCLE)[keyof typeof VENDOR_PAYOUT_CYCLE];
  bankAccountId?: string;
  autoPayout!: boolean;
  requireApproval!: boolean;
  idempotencyKey?: string;
}
