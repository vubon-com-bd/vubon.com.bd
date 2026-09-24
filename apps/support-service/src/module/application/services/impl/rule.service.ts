import { Injectable } from '@nestjs/common';
import type { RuleServiceInterface } from '../interfaces/rule.service.interface';
import type { SupportRuleRepository } from '../../../domain/repositories/support-rule.repository.interface';
import { SupportRuleEntity } from '../../../domain/entities/support-rule.entity';
import { RuleIdVO } from '../../../domain/value-objects/primitives/rule-id.vo';
import { RuleTypeVO } from '../../../domain/value-objects/primitives/rule-type.vo';
import { RuleConditionVO } from '../../../domain/value-objects/primitives/rule-condition.vo';
import type { CreateRuleRequestDTO } from '../../dtos/requests/rule';

@Injectable()
export class RuleService implements RuleServiceInterface {
  constructor(private readonly ruleRepo: SupportRuleRepository) {}

  async create(input: CreateRuleRequestDTO): Promise<{ id: string }> {
    const entity = SupportRuleEntity.create({
      name: input.name,
      type: RuleTypeVO.create(input.type),
      condition: RuleConditionVO.create(input.condition),
      action: input.action,
      priority: input.priority ?? 50,
      isActive: true,
    });
    const saved = await this.ruleRepo.save(entity);
    return { id: saved.id.value };
  }

  async findById(id: RuleIdVO): Promise<SupportRuleEntity | null> {
    return this.ruleRepo.findById(id);
  }
}
