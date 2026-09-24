import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyTicketCreatedCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-ticket-created';

  constructor(
    public readonly ticketId: string,
    public readonly userId: string,
  ) {
    super();
  }
}
