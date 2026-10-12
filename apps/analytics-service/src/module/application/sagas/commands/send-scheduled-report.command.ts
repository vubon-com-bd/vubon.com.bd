import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class SendScheduledReportCommand extends BaseSagaCommand {
  readonly type = 'analytics.saga.send-scheduled-report';
  constructor(
    public readonly reportId: string,
    public readonly recipients: readonly string[],
    public readonly sagaId?: string
  ) { super(); }
}
