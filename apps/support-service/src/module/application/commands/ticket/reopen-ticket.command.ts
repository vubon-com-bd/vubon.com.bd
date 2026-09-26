/**
 * ReopenTicketCommand
 * @module support-service/application/commands/ticket
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { ReopenTicketRequestDTO } from '../../dtos/requests/ticket/reopen-ticket.dto';

export class ReopenTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.reopen';

  constructor(public readonly payload: ReopenTicketRequestDTO) {
    super();
  }
}
