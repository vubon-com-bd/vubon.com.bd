import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyTicketEscalatedCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-ticket-escalated';

  constructor(
    public readonly ticketId: string,
    public readonly level: string,
  ) {
    super();
  }
}
