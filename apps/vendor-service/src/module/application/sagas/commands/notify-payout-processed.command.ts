import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyPayoutProcessedCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-payout-processed';

  constructor(public readonly payoutId: string) {
    super();
  }
}
