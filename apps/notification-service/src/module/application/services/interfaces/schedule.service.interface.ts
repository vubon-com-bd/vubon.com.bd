import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ScheduleEntity } from '../../../domain/entities/schedule.entity';
import type { ScheduleResponseDTO } from '../../dtos/responses/schedule-response.dto';

export interface ScheduleServiceInterface
  extends BaseServiceInterface<ScheduleEntity, string> {
  findById(id: string): Promise<ScheduleResponseDTO | null>;
  findByUser(userId: string): Promise<readonly ScheduleResponseDTO[]>;
  findDue(): Promise<readonly ScheduleEntity[]>;
}
