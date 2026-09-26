import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class UpdateAnalyticsCommand extends BaseSagaCommand {
  readonly type = 'saga.product.update-analytics';

  constructor(
    public readonly eventType: string,
    public readonly productId: string,
  ) {
    super();
  }
}
