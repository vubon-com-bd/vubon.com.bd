import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyTicketRepliedCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-ticket-replied';

  constructor(
    public readonly ticketId: string,
    public readonly messageId: string,
  ) {
    super();
  }
}
