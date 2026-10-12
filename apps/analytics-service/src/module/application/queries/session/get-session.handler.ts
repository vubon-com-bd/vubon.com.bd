import { SessionService } from '../../services/impl/session.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { GetSessionQuery } from './get-session.query.js';
import type { SessionResponseData } from '../../dtos/responses/session-response.dto.js';

@Injectable()
@QueryHandler(GetSessionQuery)
export class GetSessionHandler extends BaseQueryHandler<GetSessionQuery, SessionResponseData>
  implements IQueryHandler<GetSessionQuery> {
  readonly queryType = 'analytics.session.get';
  constructor(private readonly service: SessionService) { super(); }
  async execute(query: GetSessionQuery): Promise<SessionResponseData> {
    const result = await this.service.findById(query.sessionId);
    if (!result) throw new ApplicationNotFoundError('Session', query.sessionId);
    return result;
  }
}
