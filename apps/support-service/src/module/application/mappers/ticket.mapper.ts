/**
 * TicketMapper — domain ↔ DTO conversion
 * @module support-service/application/mappers
 *
 * Registry: uses OneWayMapper (only entity → DTO needed)
 * Rule: no business logic, pure mapping
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers';
import { TicketEntity } from '../../domain/entities/ticket.entity';
import type { TicketResponseDTO } from '../dtos/responses/ticket-response.dto';
import type { TicketPublicResponseDTO } from '../dtos/responses/ticket-public-response.dto';
import type { TicketListItemResponseDTO } from '../dtos/responses/ticket-list-response.dto';

export class TicketMapper extends OneWayMapper<TicketEntity, TicketResponseDTO> {
  map(entity: TicketEntity): TicketResponseDTO {
    const snapshot = entity.toSnapshot();
    return {
      id: snapshot.id,
      ticketNumber: snapshot.number,
      subject: snapshot.subject,
      description: snapshot.description,
      status: snapshot.status as TicketResponseDTO['status'],
      priority: snapshot.priority as TicketResponseDTO['priority'],
      type: snapshot.type as TicketResponseDTO['type'],
      channel: snapshot.channel as TicketResponseDTO['channel'],
      category: (snapshot.categoryId ?? 'general') as TicketResponseDTO['category'],
      customerId: snapshot.userId,
      assignedTo: snapshot.assignedAgentId,
      orderId: snapshot.orderId,
      productId: snapshot.productId,
      resolvedAt: snapshot.resolvedAt,
      closedAt: snapshot.closedAt,
      reopenedAt: snapshot.reopenedAt,
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  toPublic(entity: TicketEntity): TicketPublicResponseDTO {
    const snapshot = entity.toSnapshot();
    return {
      id: snapshot.id,
      ticketNumber: snapshot.number,
      subject: snapshot.subject,
      status: snapshot.status as TicketPublicResponseDTO['status'],
      priority: snapshot.priority as TicketPublicResponseDTO['priority'],
      type: snapshot.type as TicketPublicResponseDTO['type'],
      category: (snapshot.categoryId ?? 'general') as TicketPublicResponseDTO['category'],
      createdAt: snapshot.createdAt,
      resolvedAt: snapshot.resolvedAt,
      closedAt: snapshot.closedAt,
    };
  }

  toListItem(entity: TicketEntity): TicketListItemResponseDTO {
    const snapshot = entity.toSnapshot();
    return {
      id: snapshot.id,
      ticketNumber: snapshot.number,
      subject: snapshot.subject,
      status: snapshot.status as TicketListItemResponseDTO['status'],
      priority: snapshot.priority as TicketListItemResponseDTO['priority'],
      type: snapshot.type as TicketListItemResponseDTO['type'],
      assignedTo: snapshot.assignedAgentId,
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  toList(entities: readonly TicketEntity[]): readonly TicketListItemResponseDTO[] {
    return entities.map((e) => this.toListItem(e));
  }
}
