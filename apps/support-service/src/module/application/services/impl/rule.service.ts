/**
 * RuleService — use case orchestration
 * @module support-service/application/services/impl
 */
import { Injectable } from '@nestjs/common';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import type { RuleServiceInterface } from '../interfaces/rule.service.interface';
import type { SupportRuleRepository } from '../../../domain/repositories/support-rule.repository.interface';
import { SupportRuleEntity } from '../../../domain/entities/support-rule.entity';
import { RuleIdVO } from '../../../domain/value-objects/primitives/rule-id.vo';
import { RuleTypeVO } from '../../../domain/value-objects/primitives/rule-type.vo';
import { RuleConditionVO } from '../../../domain/value-objects/primitives/rule-condition.vo';

import { RuleMapper } from '../../mappers/rule.mapper';
import { RuleNotFoundException } from '../../errors/rule.errors';
import type { CreateRuleRequestDTO } from '../../dtos/requests/rule/create-rule.dto';
import type { UpdateRuleRequestDTO } from '../../dtos/requests/rule/update-rule.dto';
import type { RuleResponseDTO } from '../../dtos/responses/rule-response.dto';

@Injectable()
export class RuleService implements RuleServiceInterface {
  constructor(
    private readonly ruleRepo: SupportRuleRepository,
    private readonly mapper: RuleMapper,
  ) {}

  async create(input: CreateRuleRequestDTO): Promise<RuleResponseDTO> {
    if (input.conditions.length === 0) {
      throw new BusinessRuleError(
        'Rule requires at least one condition',
        'rule.conditions.empty',
      );
    }
    if (input.actions.length === 0) {
      throw new BusinessRuleError(
        'Rule requires at least one action',
        'rule.actions.empty',
      );
    }
    const now = new Date().toISOString();
    const conditionDsl = input.conditions
      .map((c) => `${c.field} ${c.operator} ${String(c.value)}`)
      .join(' && ');
    const rule = SupportRuleEntity.create({
      id: RuleIdVO.generate(),
      type: RuleTypeVO.create(input.type),
      condition: RuleConditionVO.create(conditionDsl),
      action: input.actions[0]?.action ?? 'noop',
      priority: input.priority,
      now,
    });
    await this.ruleRepo.save(rule);
    return this.mapper.map(rule);
  }

  async update(input: UpdateRuleRequestDTO): Promise<RuleResponseDTO> {
    const rule = await this.loadOrThrow(input.ruleId);
    const now = new Date().toISOString();
    if (input.conditions !== undefined) {
      const dsl = input.conditions
        .map((c) => `${c.field} ${c.operator} ${String(c.value)}`)
        .join(' && ');
      rule.updateCondition(RuleConditionVO.create(dsl), now);
    }
    if (input.actions !== undefined && input.actions[0]) {
      rule.updateAction(input.actions[0].action, now);
    }
    await this.ruleRepo.save(rule);
    return this.mapper.map(rule);
  }

  async getById(ruleId: string): Promise<RuleResponseDTO> {
    const rule = await this.loadOrThrow(ruleId);
    return this.mapper.map(rule);
  }

  async list(page: number, limit: number): Promise<readonly RuleResponseDTO[]> {
    const all = await this.ruleRepo.findAll();
    const safeLimit = Math.max(1, Math.min(limit, 100));
    const safePage = Math.max(1, page);
    const start = (safePage - 1) * safeLimit;
    return this.mapper.toList(all.slice(start, start + safeLimit));
  }

  async activate(ruleId: string): Promise<RuleResponseDTO> {
    const rule = await this.loadOrThrow(ruleId);
    rule.activate(new Date().toISOString());
    await this.ruleRepo.save(rule);
    return this.mapper.map(rule);
  }

  async deactivate(ruleId: string): Promise<RuleResponseDTO> {
    const rule = await this.loadOrThrow(ruleId);
    rule.deactivate(new Date().toISOString());
    await this.ruleRepo.save(rule);
    return this.mapper.map(rule);
  }

  private async loadOrThrow(ruleId: string): Promise<SupportRuleEntity> {
    const rule = await this.ruleRepo.findById(RuleIdVO.create(ruleId));
    if (!rule) {
      throw new RuleNotFoundException(ruleId);
    }
    return rule;
  }
}
