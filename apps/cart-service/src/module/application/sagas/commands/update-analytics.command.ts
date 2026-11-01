import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class UpdateAnalyticsCommand extends BaseSagaCommand {
  readonly type = 'cart.saga.update_analytics';

  constructor(
    public readonly aggregateId: string,
    public readonly eventName: string,
    public readonly data: Readonly<Record<string, unknown>>,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
