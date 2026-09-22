import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyRefundProcessedCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-refund-processed';

  constructor(public readonly refundId: string) {
    super();
  }
}
