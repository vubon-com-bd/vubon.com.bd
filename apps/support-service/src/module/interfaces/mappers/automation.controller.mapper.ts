/**
 * AutomationControllerMapper
 * @module support-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { AutomationResponseDTO as AppAutomationResponseDTO } from '../../application/dtos/responses/automation-response.dto';
import { AutomationResponseDTO } from '../dtos/responses/automation-response.dto';

@Injectable()
export class AutomationControllerMapper {
  toResponse(app: AppAutomationResponseDTO): AutomationResponseDTO {
    const res = new AutomationResponseDTO();
    res.id = app.id;
    res.name = app.name;
    res.description = app.description;
    res.type = app.type;
    res.status = app.status;
    res.trigger = {
      type: app.trigger.type,
      conditions: app.trigger.conditions ? { ...app.trigger.conditions } : undefined,
    };
    res.steps = app.steps.map((s) => ({
      id: s.id,
      order: s.order,
      action: s.action,
      params: { ...s.params },
      delayMinutes: s.delayMinutes,
    }));
    res.isActive = app.isActive;
    res.executionCount = app.executionCount;
    res.successCount = app.successCount;
    res.failureCount = app.failureCount;
    res.createdBy = app.createdBy;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }
}
