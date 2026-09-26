/**
 * CloseTicketCommand
 * @module support-service/application/commands/ticket
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { CloseTicketRequestDTO } from '../../dtos/requests/ticket/close-ticket.dto';

export class CloseTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.close';

  constructor(public readonly payload: CloseTicketRequestDTO) {
    super();
  }
}
