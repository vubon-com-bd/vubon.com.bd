import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { MarketingAutomationServiceInterface } from '../interfaces/marketing-automation.service.interface';
import type { MarketingAutomationRepository } from '../../../domain/repositories/marketing-automation.repository.interface';
import { MarketingAutomationEntity } from '../../../domain/entities/marketing-automation.entity';
import { MarketingAutomationIdVO } from '../../../domain/value-objects/primitives/marketing-automation-id.vo';
import { AutomationTypeVO } from '../../../domain/value-objects/primitives/automation-type.vo';
import { AutomationTriggerVO } from '../../../domain/value-objects/primitives/automation-trigger.vo';
import type { CreateAutomationRequestDTO } from '../../dtos/requests/automation/create-automation.dto';
import type { AutomationResponseDTO } from '../../dtos/responses/automation-response.dto';

@Injectable()
export class MarketingAutomationService
  extends BaseService<MarketingAutomationEntity, string>
  implements MarketingAutomationServiceInterface
{
  readonly name = 'MarketingAutomationService';

  constructor(
    private readonly repo: MarketingAutomationRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(input: CreateAutomationRequestDTO): Promise<AutomationResponseDTO> {
    const entity = MarketingAutomationEntity.create({
      name: input.name,
      type: AutomationTypeVO.create(input.type),
      trigger: AutomationTriggerVO.create(input.trigger),
      status: 'active',
      config: input.config ?? null,
    });
    await this.repo.save(entity);
    return this.toDTO(entity);
  }

  async trigger(automationId: string, userId: string): Promise<void> {
    const entity = await this.repo.findById(MarketingAutomationIdVO.create(automationId));
    if (!entity) throw new Error(`Automation not found: ${automationId}`);
    void userId;
    const triggered = entity.trigger_();
    await this.repo.save(triggered);
    const events = triggered.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
  }

  async findActive(): Promise<readonly AutomationResponseDTO[]> {
    const entities = await this.repo.findActive();
    return entities.map((e) => this.toDTO(e));
  }

  private toDTO(entity: MarketingAutomationEntity): AutomationResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name,
      type: entity.type.value,
      trigger: entity.trigger.value,
      status: entity.status,
      config: entity.config ?? undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as AutomationResponseDTO;
  }
}
