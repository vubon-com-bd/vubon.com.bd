import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyTicketResolvedCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-ticket-resolved';

  constructor(
    public readonly ticketId: string,
    public readonly userId: string,
  ) {
    super();
  }
}
