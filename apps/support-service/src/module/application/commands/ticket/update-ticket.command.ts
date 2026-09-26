/**
 * UpdateTicketCommand
 * @module support-service/application/commands/ticket
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateTicketRequestDTO } from '../../dtos/requests/ticket/update-ticket.dto';

export class UpdateTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.update';

  constructor(
    public readonly ticketId: string,
    public readonly payload: UpdateTicketRequestDTO,
  ) {
    super();
  }
}
