/**
 * Vendor Payout Saga Commands
 * @module vendor-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyVendorPayoutApprovedSagaCommand extends BaseSagaCommand {
  readonly type = 'vendor.saga.notify_payout_approved';
  constructor(
    public readonly vendorId: string,
    public readonly payoutId: string,
    public readonly sagaId: string,
  ) { super(); }
}

export class RecordPayoutStatsSagaCommand extends BaseSagaCommand {
  readonly type = 'vendor.saga.record_payout_stats';
  constructor(
    public readonly vendorId: string,
    public readonly amount: number,
    public readonly sagaId: string,
  ) { super(); }
}
