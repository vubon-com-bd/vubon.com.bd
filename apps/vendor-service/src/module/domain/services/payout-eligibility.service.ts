import { VendorPayoutEntity } from '../entities/vendor-payout.entity';

export class PayoutEligibilityService {
  canRequest(
    pendingPayouts: readonly VendorPayoutEntity[],
    minimumAmount: number,
    requestedAmount: number,
  ): { eligible: boolean; reason?: string } {
    if (pendingPayouts.length > 0) {
      return { eligible: false, reason: 'pending_payout_exists' };
    }
    if (requestedAmount < minimumAmount) {
      return { eligible: false, reason: 'below_minimum' };
    }
    return { eligible: true };
  }
}
