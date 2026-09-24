import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CancelScheduleCommand } from './cancel-schedule.command';
import type { ScheduleRepository } from '../../../domain/repositories/schedule.repository.interface';
import { ScheduleEntity } from '../../../domain/entities/schedule.entity';
import { ScheduleIdVO } from '../../../domain/value-objects/primitives/schedule-id.vo';
import { ScheduleStatusVO } from '../../../domain/value-objects/primitives/schedule-status.vo';

@CommandHandler(CancelScheduleCommand)
export class CancelScheduleHandler
  extends BaseCommandHandler<CancelScheduleCommand, void>
  implements ICommandHandler<CancelScheduleCommand>
{
  readonly commandType = 'schedule.cancel';

  constructor(private readonly scheduleRepo: ScheduleRepository) {
    super();
  }

  async execute(command: CancelScheduleCommand): Promise<void> {
    const entity = await this.scheduleRepo.findById(ScheduleIdVO.create(command.scheduleId));
    if (!entity) throw new Error(`Schedule not found: ${command.scheduleId}`);

    const cancelled = ScheduleEntity.reconstitute(
      entity.id,
      {
        userId: entity.userId,
        type: entity.type,
        status: ScheduleStatusVO.create('cancelled'),
        frequency: entity.frequency,
        nextRunAt: entity.nextRunAt,
        lastRunAt: entity.lastRunAt,
        payload: entity.payload,
      },
      entity.createdAt,
      new Date().toISOString(),
      entity.deletedAt ?? null,
    );

    await this.scheduleRepo.save(cancelled);
  }
}
