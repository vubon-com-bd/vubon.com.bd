import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class UpdateAnalyticsCommand extends BaseSagaCommand {
  readonly type = 'saga.logistics.update-analytics';

  constructor(
    public readonly eventType: string,
    public readonly orderId: string,
  ) {
    super();
  }
}
