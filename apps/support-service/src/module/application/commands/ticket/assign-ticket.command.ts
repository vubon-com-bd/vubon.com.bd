/**
 * AssignTicketCommand
 * @module support-service/application/commands/ticket
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { AssignTicketRequestDTO } from '../../dtos/requests/ticket/assign-ticket.dto';

export class AssignTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.assign';

  constructor(public readonly payload: AssignTicketRequestDTO) {
    super();
  }
}
