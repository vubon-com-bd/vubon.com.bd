import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';
import type { ScheduleResponseDTO } from '../dtos/responses/schedule-response.dto';

export class ScheduleMapper extends BaseMapper<ScheduleEntity, ScheduleResponseDTO> {
  toTarget(source: ScheduleEntity): ScheduleResponseDTO {
    return {
      id: source.id.value,
      userId: source.userId.value,
      type: source.type.value,
      frequency: source.frequency.value,
      status: source.status.value,
      nextRunAt: source.nextRunAt.toISOString(),
      lastRunAt: source.lastRunAt?.toISOString() ?? null,
      createdAt: source.createdAt,
    };
  }

  toSource(target: ScheduleResponseDTO): ScheduleEntity {
    void target;
    throw new Error('ScheduleMapper.toSource not supported');
  }
}
