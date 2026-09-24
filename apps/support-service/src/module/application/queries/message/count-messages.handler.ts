import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { CountMessagesQuery } from './count-messages.query';
import type { TicketMessageRepository } from '../../../domain/repositories/ticket-message.repository.interface';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';

@QueryHandler(CountMessagesQuery)
export class CountMessagesHandler
  extends BaseQueryHandler<CountMessagesQuery, number>
  implements IQueryHandler<CountMessagesQuery>
{
  readonly queryType = 'support.message.count';

  constructor(private readonly messageRepo: TicketMessageRepository) {
    super();
  }

  async execute(query: CountMessagesQuery): Promise<number> {
    const messages = await this.messageRepo.findByTicket(TicketIdVO.create(query.ticketId));
    return messages.length;
  }
}
