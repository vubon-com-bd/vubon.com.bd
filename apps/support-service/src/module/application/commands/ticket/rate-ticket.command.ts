/**
 * RateTicketCommand
 * @module support-service/application/commands/ticket
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { RateTicketRequestDTO } from '../../dtos/requests/ticket/rate-ticket.dto';

export class RateTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.rate';

  constructor(public readonly payload: RateTicketRequestDTO) {
    super();
  }
}
