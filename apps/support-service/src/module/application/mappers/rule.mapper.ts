/**
 * RuleMapper — domain ↔ DTO
 * @module support-service/application/mappers
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers';
import { SupportRuleEntity } from '../../domain/entities/support-rule.entity';
import type { RuleResponseDTO } from '../dtos/responses/rule-response.dto';

export class RuleMapper extends OneWayMapper<SupportRuleEntity, RuleResponseDTO> {
  map(entity: SupportRuleEntity): RuleResponseDTO {
    const snapshot = entity.toSnapshot();
    return {
      id: snapshot.id,
      name: snapshot.id,
      type: snapshot.type as RuleResponseDTO['type'],
      status: snapshot.isActive
        ? ('active' as RuleResponseDTO['status'])
        : ('inactive' as RuleResponseDTO['status']),
      priority: snapshot.priority,
      conditions: [],
      actions: [{ action: snapshot.action as RuleResponseDTO['actions'][number]['action'] }],
      stopOnMatch: false,
      isActive: snapshot.isActive,
      triggerCount: snapshot.triggerCount,
      createdBy: 'system',
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  toList(entities: readonly SupportRuleEntity[]): readonly RuleResponseDTO[] {
    return entities.map((e) => this.map(e));
  }
}
