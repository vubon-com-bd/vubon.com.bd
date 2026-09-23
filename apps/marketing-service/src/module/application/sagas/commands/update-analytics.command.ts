import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class UpdateAnalyticsCommand extends BaseSagaCommand {
  readonly type = 'marketing.saga.update-analytics';

  constructor(
    public readonly eventType: string,
    public readonly entityId: string,
  ) {
    super();
  }
}
