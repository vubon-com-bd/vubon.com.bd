/**
 * AutomationService — use case orchestration
 * @module support-service/application/services/impl
 */
import { Injectable } from '@nestjs/common';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import type { AutomationServiceInterface } from '../interfaces/automation.service.interface';
import type { SupportAutomationRepository } from '../../../domain/repositories/support-automation.repository.interface';
import { SupportAutomationEntity } from '../../../domain/entities/support-automation.entity';
import { AutomationIdVO } from '../../../domain/value-objects/primitives/automation-id.vo';
import { AutomationTypeVO } from '../../../domain/value-objects/primitives/automation-type.vo';

import { AutomationMapper } from '../../mappers/automation.mapper';
import { AutomationNotFoundException } from '../../errors/automation.errors';
import type { CreateAutomationRequestDTO } from '../../dtos/requests/automation/create-automation.dto';
import type { UpdateAutomationRequestDTO } from '../../dtos/requests/automation/update-automation.dto';
import type { AutomationResponseDTO } from '../../dtos/responses/automation-response.dto';

@Injectable()
export class AutomationService implements AutomationServiceInterface {
  constructor(
    private readonly automationRepo: SupportAutomationRepository,
    private readonly mapper: AutomationMapper,
  ) {}

  async create(input: CreateAutomationRequestDTO): Promise<AutomationResponseDTO> {
    if (input.steps.length === 0) {
      throw new BusinessRuleError(
        'Automation requires at least one step',
        'automation.steps.empty',
      );
    }
    const now = new Date().toISOString();
    const automation = SupportAutomationEntity.create({
      id: AutomationIdVO.generate(),
      type: AutomationTypeVO.create(input.type),
      name: input.name,
      schedule: undefined,
      now,
    });
    await this.automationRepo.save(automation);
    return this.mapper.map(automation);
  }

  async update(input: UpdateAutomationRequestDTO): Promise<AutomationResponseDTO> {
    const automation = await this.loadOrThrow(input.automationId);
    void input.steps;
    await this.automationRepo.save(automation);
    return this.mapper.map(automation);
  }

  async getById(automationId: string): Promise<AutomationResponseDTO> {
    const automation = await this.loadOrThrow(automationId);
    return this.mapper.map(automation);
  }

  async list(
    page: number,
    limit: number,
  ): Promise<readonly AutomationResponseDTO[]> {
    const all = await this.automationRepo.findAll();
    const safeLimit = Math.max(1, Math.min(limit, 100));
    const safePage = Math.max(1, page);
    const start = (safePage - 1) * safeLimit;
    return this.mapper.toList(all.slice(start, start + safeLimit));
  }

  async enable(automationId: string): Promise<AutomationResponseDTO> {
    const automation = await this.loadOrThrow(automationId);
    automation.enable(new Date().toISOString());
    await this.automationRepo.save(automation);
    return this.mapper.map(automation);
  }

  async disable(automationId: string): Promise<AutomationResponseDTO> {
    const automation = await this.loadOrThrow(automationId);
    automation.disable(new Date().toISOString());
    await this.automationRepo.save(automation);
    return this.mapper.map(automation);
  }

  async trigger(
    automationId: string,
    outcome: 'success' | 'failure' | 'partial',
    errorMessage?: string,
  ): Promise<AutomationResponseDTO> {
    const automation = await this.loadOrThrow(automationId);
    automation.markRun(outcome, new Date().toISOString(), errorMessage);
    await this.automationRepo.save(automation);
    return this.mapper.map(automation);
  }

  private async loadOrThrow(automationId: string): Promise<SupportAutomationEntity> {
    const automation = await this.automationRepo.findById(
      AutomationIdVO.create(automationId),
    );
    if (!automation) {
      throw new AutomationNotFoundException(automationId);
    }
    return automation;
  }
}
