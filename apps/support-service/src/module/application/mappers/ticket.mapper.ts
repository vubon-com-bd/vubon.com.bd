import { Injectable } from '@nestjs/common';
import { TicketEntity } from '../../domain/entities/ticket.entity';
import type { TicketResponseDTO } from '../dtos/responses/ticket-response.dto';

@Injectable()
export class TicketMapper {
  toDTO(entity: TicketEntity): TicketResponseDTO {
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
