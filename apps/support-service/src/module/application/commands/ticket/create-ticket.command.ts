/**
 * CreateTicketCommand
 * @module support-service/application/commands/ticket
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { CreateTicketRequestDTO } from '../../dtos/requests/ticket/create-ticket.dto';

export class CreateTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.create';

  constructor(public readonly payload: CreateTicketRequestDTO) {
    super();
  }
}
