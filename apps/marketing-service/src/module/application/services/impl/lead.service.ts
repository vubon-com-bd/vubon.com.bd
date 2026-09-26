import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { LeadServiceInterface } from '../interfaces/lead.service.interface';
import type { LeadRepository } from '../../../domain/repositories/lead.repository.interface';
import { LeadEntity } from '../../../domain/entities/lead.entity';
import { LeadIdVO } from '../../../domain/value-objects/primitives/lead-id.vo';
import { LeadNameVO } from '../../../domain/value-objects/primitives/lead-name.vo';
import { LeadEmailVO } from '../../../domain/value-objects/primitives/lead-email.vo';
import { LeadStatusVO } from '../../../domain/value-objects/primitives/lead-status.vo';
import { LeadSourceVO } from '../../../domain/value-objects/primitives/lead-source.vo';
import { LeadScoreVO } from '../../../domain/value-objects/primitives/lead-score.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { LeadNotFoundAppError } from '../../errors/lead.errors';
import type { CreateLeadRequestDTO } from '../../dtos/requests/lead/create-lead.dto';
import type { LeadResponseDTO } from '../../dtos/responses/lead-response.dto';

@Injectable()
export class LeadService
  extends BaseService<LeadEntity, string>
  implements LeadServiceInterface
{
  readonly name = 'LeadService';

  constructor(
    private readonly repo: LeadRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(input: CreateLeadRequestDTO): Promise<LeadResponseDTO> {
    const entity = LeadEntity.create({
      name: LeadNameVO.create(input.name),
      email: LeadEmailVO.create(input.email ?? ""),
      status: LeadStatusVO.create('new'),
      source: LeadSourceVO.create(input.source),
      score: LeadScoreVO.create(0),
      assignedTo: null,
    });
    await this.repo.save(entity);
    const events = entity.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return this.toDTO(entity);
  }

  async qualify(leadId: string): Promise<LeadResponseDTO> {
    const entity = await this.repo.findById(LeadIdVO.create(leadId));
    if (!entity) throw new LeadNotFoundAppError(leadId);
    const updated = entity.qualify();
    await this.repo.save(updated);
    const events = updated.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return this.toDTO(updated);
  }

  async convert(leadId: string, userId: string): Promise<LeadResponseDTO> {
    const entity = await this.repo.findById(LeadIdVO.create(leadId));
    if (!entity) throw new LeadNotFoundAppError(leadId);
    const updated = entity.convert(UserIdVO.create(userId));
    await this.repo.save(updated);
    const events = updated.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return this.toDTO(updated);
  }

  async assign(leadId: string, assigneeId: string): Promise<LeadResponseDTO> {
    const entity = await this.repo.findById(LeadIdVO.create(leadId));
    if (!entity) throw new LeadNotFoundAppError(leadId);
    void assigneeId;
    return this.toDTO(entity);
  }

  private toDTO(entity: LeadEntity): LeadResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name.value,
      email: entity.email.value,
      status: entity.status.value,
      source: entity.source.value,
      score: entity.score.value,
      assignedTo: entity.assignedTo?.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as LeadResponseDTO;
  }
}
