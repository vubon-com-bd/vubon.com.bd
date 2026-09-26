/**
 * ResolveTicketCommand
 * @module support-service/application/commands/ticket
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { ResolveTicketRequestDTO } from '../../dtos/requests/ticket/resolve-ticket.dto';

export class ResolveTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.resolve';

  constructor(public readonly payload: ResolveTicketRequestDTO) {
    super();
  }
}
