import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListSessionsQuery } from './list-sessions.query';
import type { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import {
  type SessionResponseDTO,
  toSessionResponse,
} from '../../dtos/responses';

@QueryHandler(ListSessionsQuery)
export class ListSessionsHandler
  extends BaseQueryHandler<ListSessionsQuery, readonly SessionResponseDTO[]>
  implements IQueryHandler<ListSessionsQuery>
{
  readonly queryType = 'analytics.session.list';

  constructor(private readonly sessionRepo: SessionRepository) {
    super();
  }

  async execute(query: ListSessionsQuery): Promise<readonly SessionResponseDTO[]> {
    const entities = await this.sessionRepo.findInWindow(
      new Date(query.fromDate).getTime(),
      new Date(query.toDate).getTime(),
    );
    return entities.slice(0, query.limit).map((e) => toSessionResponse(e));
  }
}
