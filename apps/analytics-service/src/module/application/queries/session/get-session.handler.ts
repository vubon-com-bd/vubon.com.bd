import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSessionQuery } from './get-session.query';
import type { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { SessionIdVO } from '../../../domain/value-objects/primitives/session-id.vo';
import { SessionNotFoundError } from '../../../domain/errors/session.errors';
import {
  type SessionResponseDTO,
  toSessionResponse,
} from '../../dtos/responses';

@QueryHandler(GetSessionQuery)
export class GetSessionHandler
  extends BaseQueryHandler<GetSessionQuery, SessionResponseDTO>
  implements IQueryHandler<GetSessionQuery>
{
  readonly queryType = 'analytics.session.get';

  constructor(private readonly sessionRepo: SessionRepository) {
    super();
  }

  async execute(query: GetSessionQuery): Promise<SessionResponseDTO> {
    const entity = await this.sessionRepo.findById(SessionIdVO.create(query.sessionId));
    if (!entity) throw new SessionNotFoundError(query.sessionId);
    return toSessionResponse(entity);
  }
}
