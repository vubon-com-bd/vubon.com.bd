import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SupportRuleEntity } from '../entities/support-rule.entity';
import { RuleIdVO } from '../value-objects/primitives/rule-id.vo';

export interface SupportRuleRepository extends BaseRepository<SupportRuleEntity, RuleIdVO> {
  findActive(): Promise<readonly SupportRuleEntity[]>;
}
