import { Injectable } from '@nestjs/common';
import type { AutomationServiceInterface } from '../interfaces/automation.service.interface';
import type { SupportAutomationRepository } from '../../../domain/repositories/support-automation.repository.interface';
import { SupportAutomationEntity } from '../../../domain/entities/support-automation.entity';
import { AutomationIdVO } from '../../../domain/value-objects/primitives/automation-id.vo';
import { AutomationTypeVO } from '../../../domain/value-objects/primitives/automation-type.vo';
import { AutomationStatusVO } from '../../../domain/value-objects/primitives/automation-status.vo';
import type { CreateAutomationRequestDTO } from '../../dtos/requests/automation';

@Injectable()
export class AutomationService implements AutomationServiceInterface {
  constructor(private readonly automationRepo: SupportAutomationRepository) {}

  async create(input: CreateAutomationRequestDTO): Promise<{ id: string }> {
    const entity = SupportAutomationEntity.create({
      name: input.name,
      type: AutomationTypeVO.create(input.type),
      trigger: input.trigger,
      action: input.action,
      status: AutomationStatusVO.create('active'),
      config: input.config ?? null,
    });
    const saved = await this.automationRepo.save(entity);
    return { id: saved.id.value };
  }

  async findById(id: AutomationIdVO): Promise<SupportAutomationEntity | null> {
    return this.automationRepo.findById(id);
  }
}
