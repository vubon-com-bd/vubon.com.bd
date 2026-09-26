/**
 * ListRulesHandler
 * @module support-service/application/queries/rule
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListRulesQuery } from './list-rules.query';
import type { RuleResponseDTO } from '../../dtos/responses/rule-response.dto';
import type { RuleServiceInterface } from '../../services/interfaces/rule.service.interface';

export class ListRulesHandler extends BaseQueryHandler<
  ListRulesQuery,
  readonly RuleResponseDTO[]
> {
  readonly queryType = 'support.rule.list';

  constructor(private readonly ruleService: RuleServiceInterface) {
    super();
  }

  async execute(query: ListRulesQuery): Promise<readonly RuleResponseDTO[]> {
    return this.ruleService.list(query.page, query.limit);
  }
}
