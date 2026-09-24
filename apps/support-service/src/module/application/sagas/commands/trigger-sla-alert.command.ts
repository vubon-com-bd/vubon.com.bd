import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class TriggerSlaAlertCommand extends BaseSagaCommand {
  readonly type = 'saga.trigger-sla-alert';

  constructor(
    public readonly ticketId: string,
    public readonly slaId: string,
  ) {
    super();
  }
}
