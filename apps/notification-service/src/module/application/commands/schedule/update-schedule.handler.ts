import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateScheduleCommand } from './update-schedule.command';
import type { ScheduleResponseDTO } from '../../dtos/responses/schedule-response.dto';
import type { ScheduleRepository } from '../../../domain/repositories/schedule.repository.interface';
import { ScheduleEntity } from '../../../domain/entities/schedule.entity';
import { ScheduleIdVO } from '../../../domain/value-objects/primitives/schedule-id.vo';
import { ScheduleFrequencyVO } from '../../../domain/value-objects/primitives/schedule-frequency.vo';

@CommandHandler(UpdateScheduleCommand)
export class UpdateScheduleHandler
  extends BaseCommandHandler<UpdateScheduleCommand, ScheduleResponseDTO>
  implements ICommandHandler<UpdateScheduleCommand>
{
  readonly commandType = 'schedule.update';

  constructor(private readonly scheduleRepo: ScheduleRepository) {
    super();
  }

  async execute(command: UpdateScheduleCommand): Promise<ScheduleResponseDTO> {
    const entity = await this.scheduleRepo.findById(ScheduleIdVO.create(command.scheduleId));
    if (!entity) throw new Error(`Schedule not found: ${command.scheduleId}`);

    const updated = ScheduleEntity.reconstitute(
      entity.id,
      {
        userId: entity.userId,
        type: entity.type,
        status: entity.status,
        frequency: command.frequency
          ? ScheduleFrequencyVO.create(command.frequency)
          : entity.frequency,
        nextRunAt: command.startAt ? new Date(command.startAt) : entity.nextRunAt,
        lastRunAt: entity.lastRunAt,
        payload: command.payload ?? entity.payload,
      },
      entity.createdAt,
      new Date().toISOString(),
      entity.deletedAt ?? null,
    );

    const saved = await this.scheduleRepo.save(updated);
    return {
      id: saved.id.value,
      userId: saved.userId.value,
      type: saved.type.value,
      frequency: saved.frequency.value,
      status: saved.status.value,
      nextRunAt: saved.nextRunAt.toISOString(),
      lastRunAt: saved.lastRunAt?.toISOString() ?? null,
      createdAt: saved.createdAt,
    };
  }
}
