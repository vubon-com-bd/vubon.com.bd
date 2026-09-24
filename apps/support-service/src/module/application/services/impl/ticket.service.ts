import { Injectable } from '@nestjs/common';
import type { TicketServiceInterface } from '../interfaces/ticket.service.interface';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';
import { TicketEntity } from '../../../domain/entities/ticket.entity';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import { TicketNumberVO } from '../../../domain/value-objects/primitives/ticket-number.vo';
import { TicketSubjectVO } from '../../../domain/value-objects/primitives/ticket-subject.vo';
import { TicketDescriptionVO } from '../../../domain/value-objects/primitives/ticket-description.vo';
import { TicketStatusVO } from '../../../domain/value-objects/primitives/ticket-status.vo';
import { TicketPriorityVO } from '../../../domain/value-objects/primitives/ticket-priority.vo';
import { TicketTypeVO } from '../../../domain/value-objects/primitives/ticket-type.vo';
import { TicketChannelVO } from '../../../domain/value-objects/primitives/ticket-channel.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { TicketNotFoundError, TicketOperationFailedError } from '../../errors/ticket.errors';
import type { CreateTicketRequestDTO, UpdateTicketRequestDTO } from '../../dtos/requests/ticket';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';

@Injectable()
export class TicketService implements TicketServiceInterface {
  constructor(private readonly ticketRepo: TicketRepository) {}

  async create(input: CreateTicketRequestDTO): Promise<TicketResponseDTO> {
    try {
      const entity = TicketEntity.create({
        number: TicketNumberVO.create(`TKT-${Date.now()}`),
        subject: TicketSubjectVO.create(input.subject),
        description: TicketDescriptionVO.create(input.description),
        status: TicketStatusVO.create('open'),
        priority: TicketPriorityVO.create(input.priority ?? 'normal'),
        type: TicketTypeVO.create(input.type ?? 'question'),
        channel: TicketChannelVO.create(input.channel ?? 'web'),
        userId: UserIdVO.create(input.customerEmail ?? 'unknown@example.com'),
        assignedAgentId: null,
        tags: input.tags ?? [],
        resolvedAt: null,
        closedAt: null,
      });
      const saved = await this.ticketRepo.save(entity);
      return this.toDTO(saved);
    } catch (error) {
      if (error instanceof TicketNotFoundError) throw error;
      throw new TicketOperationFailedError(
        error instanceof Error ? error.message : 'unknown',
      );
    }
  }

  async update(id: TicketIdVO, input: UpdateTicketRequestDTO): Promise<TicketResponseDTO> {
    const existing = await this.ticketRepo.findById(id);
    if (!existing) throw new TicketNotFoundError(id.value);

    const updated = TicketEntity.reconstitute(
      existing.id,
      {
        number: existing.number,
        subject: input.subject ? TicketSubjectVO.create(input.subject) : existing.subject,
        description: input.description
          ? TicketDescriptionVO.create(input.description)
          : existing.description,
        status: existing.status,
        priority: input.priority
          ? TicketPriorityVO.create(input.priority)
          : existing.priority,
        type: existing.type,
        channel: existing.channel,
        userId: existing.userId,
        assignedAgentId: existing.assignedAgentId,
        tags: input.tags ?? existing.tags,
        resolvedAt: existing.resolvedAt,
        closedAt: existing.closedAt,
      },
      existing.createdAt,
      new Date().toISOString(),
      existing.deletedAt ?? null,
    );
    const saved = await this.ticketRepo.save(updated);
    return this.toDTO(saved);
  }

  async findById(id: TicketIdVO): Promise<TicketEntity | null> {
    return this.ticketRepo.findById(id);
  }

  async delete(id: TicketIdVO): Promise<void> {
    await this.ticketRepo.delete(id);
  }

  private toDTO(entity: TicketEntity): TicketResponseDTO {
    return {
      id: entity.id.value,
      number: entity.number.value,
      subject: entity.subject.value,
      description: entity.description.value,
      status: entity.status.value,
      priority: entity.priority.value,
      type: entity.type.value,
      channel: entity.channel.value,
      userId: entity.userId.value,
      assignedAgentId: entity.assignedAgentId?.value ?? null,
      tags: entity.tags,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      resolvedAt: entity.resolvedAt?.toISOString() ?? null,
      closedAt: entity.closedAt?.toISOString() ?? null,
    };
  }
}
