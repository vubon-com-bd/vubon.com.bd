import { Injectable } from '@nestjs/common';
import type { TicketResponseDTO } from '../../application/dtos/responses/ticket-response.dto';
import type { TicketResponseDto } from '../dtos/responses/ticket.response.dto';

@Injectable()
export class TicketControllerMapper {
  toHttp(dto: TicketResponseDTO): TicketResponseDto {
    return {
      id: dto.id,
      number: dto.number,
      subject: dto.subject,
      description: dto.description,
      status: dto.status,
      priority: dto.priority,
      type: dto.type,
      channel: dto.channel,
      userId: dto.userId,
      assignedAgentId: dto.assignedAgentId ?? undefined,
      tags: [...dto.tags],
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
      resolvedAt: dto.resolvedAt ?? undefined,
      closedAt: dto.closedAt ?? undefined,
    };
  }
}
