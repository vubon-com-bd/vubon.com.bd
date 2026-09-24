import type { SupportRuleEntity } from '../../../domain/entities/support-rule.entity';
import type { RuleIdVO } from '../../../domain/value-objects/primitives/rule-id.vo';
import type { CreateRuleRequestDTO } from '../../dtos/requests/rule';

export interface RuleServiceInterface {
  create(input: CreateRuleRequestDTO): Promise<{ id: string }>;
  findById(id: RuleIdVO): Promise<SupportRuleEntity | null>;
}
