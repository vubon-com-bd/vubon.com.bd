/**
 * SlaControllerMapper
 * @module support-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { SlaResponseDTO as AppSlaResponseDTO } from '../../application/dtos/responses/sla-response.dto';
import { SlaResponseDTO } from '../dtos/responses/sla-response.dto';

@Injectable()
export class SlaControllerMapper {
  toResponse(app: AppSlaResponseDTO): SlaResponseDTO {
    const res = new SlaResponseDTO();
    res.id = app.id;
    res.ticketId = app.ticketId;
    res.metric = app.metric;
    res.targetMinutes = app.targetMinutes;
    res.actualMinutes = app.actualMinutes;
    res.status = app.status;
    res.priority = app.priority;
    res.dueAt = app.dueAt;
    res.metAt = app.metAt;
    res.breachedAt = app.breachedAt;
    res.remainingMinutes = app.remainingMinutes;
    res.warningThresholdPercent = app.warningThresholdPercent;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }
}
