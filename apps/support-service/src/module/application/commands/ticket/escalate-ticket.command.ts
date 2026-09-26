/**
 * EscalateTicketCommand
 * @module support-service/application/commands/ticket
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { EscalateTicketRequestDTO } from '../../dtos/requests/ticket/escalate-ticket.dto';

export class EscalateTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.escalate';

  constructor(public readonly payload: EscalateTicketRequestDTO) {
    super();
  }
}
