import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class AutoCloseInactiveTicketCommand extends BaseSagaCommand {
  readonly type = 'saga.auto-close-inactive-ticket';

  constructor(public readonly ticketId: string) {
    super();
  }
}
