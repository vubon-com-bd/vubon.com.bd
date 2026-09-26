/**
 * RuleControllerMapper
 * @module support-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { RuleResponseDTO as AppRuleResponseDTO } from '../../application/dtos/responses/rule-response.dto';
import { RuleResponseDTO } from '../dtos/responses/rule-response.dto';

@Injectable()
export class RuleControllerMapper {
  toResponse(app: AppRuleResponseDTO): RuleResponseDTO {
    const res = new RuleResponseDTO();
    res.id = app.id;
    res.name = app.name;
    res.description = app.description;
    res.type = app.type;
    res.status = app.status;
    res.priority = app.priority;
    res.conditions = app.conditions.map((c) => ({
      field: c.field,
      operator: c.operator,
      value: c.value,
    }));
    res.actions = app.actions.map((a) => ({
      action: a.action,
      params: a.params ? { ...a.params } : undefined,
    }));
    res.stopOnMatch = app.stopOnMatch;
    res.isActive = app.isActive;
    res.triggerCount = app.triggerCount;
    res.createdBy = app.createdBy;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }
}
