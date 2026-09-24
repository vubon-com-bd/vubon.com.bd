import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ScheduleServiceInterface } from '../interfaces/schedule.service.interface';
import type { ScheduleRepository } from '../../../domain/repositories/schedule.repository.interface';
import { ScheduleEntity } from '../../../domain/entities/schedule.entity';
import { ScheduleIdVO } from '../../../domain/value-objects/primitives/schedule-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { ScheduleResponseDTO } from '../../dtos/responses/schedule-response.dto';

@Injectable()
export class ScheduleService
  extends BaseService<ScheduleEntity, string>
  implements ScheduleServiceInterface
{
  readonly name = 'ScheduleService';

  constructor(private readonly repo: ScheduleRepository) {
    super();
  }

  async findById(id: string): Promise<ScheduleResponseDTO | null> {
    const entity = await this.repo.findById(ScheduleIdVO.create(id));
    return entity ? this.toDTO(entity) : null;
  }

  async findByUser(userId: string): Promise<readonly ScheduleResponseDTO[]> {
    const entities = await this.repo.findByUser(UserIdVO.create(userId));
    return entities.map((e) => this.toDTO(e));
  }

  async findDue(): Promise<readonly ScheduleEntity[]> {
    return this.repo.findDue(new Date());
  }

  private toDTO(entity: ScheduleEntity): ScheduleResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      frequency: entity.frequency.value,
      status: entity.status.value,
      nextRunAt: entity.nextRunAt.toISOString(),
      lastRunAt: entity.lastRunAt?.toISOString() ?? null,
      createdAt: entity.createdAt,
    };
  }
}
