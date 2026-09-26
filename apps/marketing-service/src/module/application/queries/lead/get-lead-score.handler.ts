import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetLeadScoreQuery } from './get-lead-score.query';
import type { LeadScoreRepository } from '../../../domain/repositories/lead-score.repository.interface';
import { LeadIdVO } from '../../../domain/value-objects/primitives/lead-id.vo';

@QueryHandler(GetLeadScoreQuery)
export class GetLeadScoreHandler
  extends BaseQueryHandler<GetLeadScoreQuery, number>
  implements IQueryHandler<GetLeadScoreQuery>
{
  readonly queryType = 'marketing.lead.get-score';

  constructor(private readonly repo: LeadScoreRepository) {
    super();
  }

  async execute(query: GetLeadScoreQuery): Promise<number> {
    const scores = await this.repo.findByLead(LeadIdVO.create(query.leadId));
    return scores[0]?.score.score.value ?? 0;
  }
}
