/**
 * TicketControllerMapper — application DTO ↔ interface DTO
 * @module support-service/interfaces/mappers
 *
 * Rule: no business logic, pure shape transformation
 */
import { Injectable } from '@nestjs/common';
import type { TicketResponseDTO as AppTicketResponseDTO } from '../../application/dtos/responses/ticket-response.dto';
import { TicketResponseDTO } from '../dtos/responses/ticket-response.dto';

@Injectable()
export class TicketControllerMapper {
  toResponse(app: AppTicketResponseDTO): TicketResponseDTO {
    const response = new TicketResponseDTO();
    response.id = app.id;
    response.ticketNumber = app.ticketNumber;
    response.subject = app.subject;
    response.description = app.description;
    response.status = app.status;
    response.priority = app.priority;
    response.type = app.type;
    response.channel = app.channel;
    response.category = app.category;
    response.customerId = app.customerId;
    response.assignedTo = app.assignedTo;
    response.orderId = app.orderId;
    response.productId = app.productId;
    response.tags = app.tags ? [...app.tags] : undefined;
    response.resolvedAt = app.resolvedAt;
    response.closedAt = app.closedAt;
    response.createdAt = app.createdAt;
    response.updatedAt = app.updatedAt;
    return response;
  }
}
