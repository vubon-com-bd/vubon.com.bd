import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthSessionsQuery } from './list-auth-sessions.query.js';
import type { AuthSessionResponseDTO } from '../../dtos/responses/auth-session-response.dto.js';
import type { AuthSessionServiceInterface } from '../../services/interfaces/auth-session.service.interface.js';
import { AUTH_SESSION_SERVICE } from '../../services/interfaces/auth-session.service.interface.js';

@QueryHandler(ListAuthSessionsQuery)
export class ListAuthSessionsHandler
  extends BaseQueryHandler<ListAuthSessionsQuery, readonly AuthSessionResponseDTO[]>
  implements IQueryHandler<ListAuthSessionsQuery>
{
  readonly queryType = 'auth.list-sessions';
  constructor(@Inject(AUTH_SESSION_SERVICE) private readonly service: AuthSessionServiceInterface) { super(); }

  async execute(query: ListAuthSessionsQuery): Promise<readonly AuthSessionResponseDTO[]> {
    return this.service.findActiveByUser(query.userId);
  }
}
