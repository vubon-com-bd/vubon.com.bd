import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class UpdateAnalyticsCommand extends BaseSagaCommand {
  readonly type = 'saga.update-analytics';

  constructor(
    public readonly eventType: string,
    public readonly referenceId: string,
  ) {
    super();
  }
}
