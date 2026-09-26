/**
 * GetRuleHandler
 * @module support-service/application/queries/rule
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetRuleQuery } from './get-rule.query';
import type { RuleResponseDTO } from '../../dtos/responses/rule-response.dto';
import type { RuleServiceInterface } from '../../services/interfaces/rule.service.interface';

export class GetRuleHandler extends BaseQueryHandler<
  GetRuleQuery,
  RuleResponseDTO
> {
  readonly queryType = 'support.rule.get';

  constructor(private readonly ruleService: RuleServiceInterface) {
    super();
  }

  async execute(query: GetRuleQuery): Promise<RuleResponseDTO> {
    return this.ruleService.getById(query.ruleId);
  }
}
