import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendScheduledReportCommand extends BaseSagaCommand {
  readonly type = 'analytics.saga.send-scheduled-report';

  constructor(
    public readonly reportId: string,
    public readonly nextRunAt: string,
  ) {
    super();
  }
}
