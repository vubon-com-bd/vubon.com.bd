import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { BroadcastEntity } from '../../domain/entities/broadcast.entity';
import type { BroadcastResponseDTO } from '../dtos/responses/broadcast-response.dto';

export class BroadcastMapper extends BaseMapper<BroadcastEntity, BroadcastResponseDTO> {
  toTarget(source: BroadcastEntity): BroadcastResponseDTO {
    return {
      id: source.id.value,
      type: source.type.value,
      status: source.status.value,
      target: source.audience.value,
      content: source.content,
      scheduledAt: source.scheduledAt?.toISOString() ?? null,
      startedAt: source.startedAt?.toISOString() ?? null,
      completedAt: source.completedAt?.toISOString() ?? null,
      createdAt: source.createdAt,
    };
  }

  toSource(target: BroadcastResponseDTO): BroadcastEntity {
    void target;
    throw new Error('BroadcastMapper.toSource not supported');
  }
}
