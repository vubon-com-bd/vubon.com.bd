/**
 * AutomationMapper — domain ↔ DTO
 * @module support-service/application/mappers
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers';
import { SupportAutomationEntity } from '../../domain/entities/support-automation.entity';
import type { AutomationResponseDTO } from '../dtos/responses/automation-response.dto';

export class AutomationMapper extends OneWayMapper<
  SupportAutomationEntity,
  AutomationResponseDTO
> {
  map(entity: SupportAutomationEntity): AutomationResponseDTO {
    const snapshot = entity.toSnapshot();
    return {
      id: snapshot.id,
      name: snapshot.name,
      type: snapshot.type as AutomationResponseDTO['type'],
      status: snapshot.status as AutomationResponseDTO['status'],
      trigger: {
        type: 'manual' as AutomationResponseDTO['trigger']['type'],
      },
      steps: [],
      isActive: entity.isEnabled,
      executionCount: snapshot.totalRuns,
      successCount: snapshot.totalRuns - snapshot.failureCount,
      failureCount: snapshot.failureCount,
      createdBy: 'system',
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  toList(entities: readonly SupportAutomationEntity[]): readonly AutomationResponseDTO[] {
    return entities.map((e) => this.map(e));
  }
}
