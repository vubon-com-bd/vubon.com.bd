/**
 * SupportRuleRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SupportRuleEntity } from '../entities/support-rule.entity';
import { RuleIdVO } from '../value-objects/primitives/rule-id.vo';
import { RuleTypeVO } from '../value-objects/primitives/rule-type.vo';

export interface SupportRuleRepository
  extends BaseRepository<SupportRuleEntity, RuleIdVO> {
  findActive(): Promise<readonly SupportRuleEntity[]>;
  findByType(type: RuleTypeVO): Promise<readonly SupportRuleEntity[]>;
  findAssignmentRules(): Promise<readonly SupportRuleEntity[]>;
  findActiveByPriority(): Promise<readonly SupportRuleEntity[]>;
}
