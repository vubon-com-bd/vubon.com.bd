import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyPayoutProcessedCommand extends BaseSagaCommand {
  readonly type = 'vendor.saga.notify_payout_processed';

  constructor(
    public readonly payoutId: string,
    public readonly vendorId: string,
    public readonly netAmount: number,
    public readonly currency: string,
    public readonly status: string,
    public readonly processedAt: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
