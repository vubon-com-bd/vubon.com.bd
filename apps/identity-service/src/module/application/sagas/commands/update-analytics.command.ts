import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class UpdateAnalyticsCommand extends BaseSagaCommand {
  readonly type = 'saga.update-analytics';
  constructor(
    public readonly eventName: string,
    public readonly userId?: string,
    public readonly metadata?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
