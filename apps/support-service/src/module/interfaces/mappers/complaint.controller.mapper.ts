/**
 * ComplaintControllerMapper
 * @module support-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { ComplaintResponseDTO as AppComplaintResponseDTO } from '../../application/dtos/responses/complaint-response.dto';
import { ComplaintResponseDTO } from '../dtos/responses/complaint-response.dto';

@Injectable()
export class ComplaintControllerMapper {
  toResponse(app: AppComplaintResponseDTO): ComplaintResponseDTO {
    const res = new ComplaintResponseDTO();
    res.id = app.id;
    res.complaintNumber = app.complaintNumber;
    res.subject = app.subject;
    res.description = app.description;
    res.type = app.type;
    res.status = app.status;
    res.severity = app.severity;
    res.userId = app.userId;
    res.orderId = app.orderId;
    res.productId = app.productId;
    res.attachments = app.attachments ? [...app.attachments] : undefined;
    res.assignedTo = app.assignedTo;
    res.resolution = app.resolution;
    res.resolvedAt = app.resolvedAt;
    res.closedAt = app.closedAt;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }
}
