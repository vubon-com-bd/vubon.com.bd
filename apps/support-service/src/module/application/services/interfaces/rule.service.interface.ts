/**
 * RuleServiceInterface
 * @module support-service/application/services/interfaces
 */
import type { CreateRuleRequestDTO } from '../../dtos/requests/rule/create-rule.dto';
import type { UpdateRuleRequestDTO } from '../../dtos/requests/rule/update-rule.dto';
import type { RuleResponseDTO } from '../../dtos/responses/rule-response.dto';

export interface RuleServiceInterface {
  create(input: CreateRuleRequestDTO): Promise<RuleResponseDTO>;
  update(input: UpdateRuleRequestDTO): Promise<RuleResponseDTO>;
  getById(ruleId: string): Promise<RuleResponseDTO>;
  list(page: number, limit: number): Promise<readonly RuleResponseDTO[]>;
  activate(ruleId: string): Promise<RuleResponseDTO>;
  deactivate(ruleId: string): Promise<RuleResponseDTO>;
}
