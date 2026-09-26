/**
 * SlaMapper — domain ↔ DTO
 * @module support-service/application/mappers
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers';
import { SlaEntity } from '../../domain/entities/sla.entity';
import type { SlaResponseDTO } from '../dtos/responses/sla-response.dto';

export class SlaMapper extends OneWayMapper<SlaEntity, SlaResponseDTO> {
  map(entity: SlaEntity): SlaResponseDTO {
    const snapshot = entity.toSnapshot();
    const target = snapshot.target;
    const elapsed = snapshot.elapsedMinutes;
    return {
      id: snapshot.id,
      ticketId: snapshot.ticketId,
      metric: 'resolution' as SlaResponseDTO['metric'],
      targetMinutes: target,
      actualMinutes: elapsed,
      status: snapshot.status as SlaResponseDTO['status'],
      priority: snapshot.priority as SlaResponseDTO['priority'],
      dueAt: new Date(Date.parse(snapshot.startedAt) + target * 60000).toISOString(),
      metAt: snapshot.status === 'met' ? snapshot.endedAt : undefined,
      breachedAt: snapshot.status === 'breached' ? snapshot.endedAt : undefined,
      remainingMinutes: target - elapsed,
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  toList(entities: readonly SlaEntity[]): readonly SlaResponseDTO[] {
    return entities.map((e) => this.map(e));
  }
}
