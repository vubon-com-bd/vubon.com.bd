import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthSessionQuery } from './get-auth-session.query.js';
import type { AuthSessionResponseDTO } from '../../dtos/responses/auth-session-response.dto.js';
import type { AuthSessionServiceInterface } from '../../services/interfaces/auth-session.service.interface.js';
import { AUTH_SESSION_SERVICE } from '../../services/interfaces/auth-session.service.interface.js';
import { SessionNotFoundError } from '../../../domain/errors/session.errors.js';

@QueryHandler(GetAuthSessionQuery)
export class GetAuthSessionHandler
  extends BaseQueryHandler<GetAuthSessionQuery, AuthSessionResponseDTO>
  implements IQueryHandler<GetAuthSessionQuery>
{
  readonly queryType = 'auth.get-session';
  constructor(@Inject(AUTH_SESSION_SERVICE) private readonly service: AuthSessionServiceInterface) { super(); }

  async execute(query: GetAuthSessionQuery): Promise<AuthSessionResponseDTO> {
    const session = await this.service.findById(query.sessionId);
    if (!session) throw new SessionNotFoundError(query.sessionId);
    return session;
  }
}
