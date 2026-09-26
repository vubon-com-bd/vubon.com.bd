import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateScheduleCommand } from './create-schedule.command';
import type { ScheduleResponseDTO } from '../../dtos/responses/schedule-response.dto';
import type { ScheduleRepository } from '../../../domain/repositories/schedule.repository.interface';
import { ScheduleEntity } from '../../../domain/entities/schedule.entity';
import { ScheduleStatusVO } from '../../../domain/value-objects/primitives/schedule-status.vo';
import { ScheduleTypeVO } from '../../../domain/value-objects/primitives/schedule-type.vo';
import { ScheduleFrequencyVO } from '../../../domain/value-objects/primitives/schedule-frequency.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { ScheduleCreatedEvent } from '../../../domain/events/schedule.events';

@CommandHandler(CreateScheduleCommand)
export class CreateScheduleHandler
  extends BaseCommandHandler<CreateScheduleCommand, ScheduleResponseDTO>
  implements ICommandHandler<CreateScheduleCommand>
{
  readonly commandType = 'schedule.create';

  constructor(
    private readonly scheduleRepo: ScheduleRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateScheduleCommand): Promise<ScheduleResponseDTO> {
    const entity = ScheduleEntity.create({
      userId: UserIdVO.create(command.userId),
      type: ScheduleTypeVO.create(command.scheduleType),
      status: ScheduleStatusVO.create('active'),
      frequency: ScheduleFrequencyVO.create(command.frequency),
      nextRunAt: new Date(command.startAt),
      lastRunAt: null,
      payload: command.payload,
    });

    const saved = await this.scheduleRepo.save(entity);

    // ✅ FIXED: 4 args (aggregateId, scheduleId, nextRunAt, version)
    await this.eventBus.publish(
      new ScheduleCreatedEvent(saved.id.value, saved.id, saved.nextRunAt, 0),
    );

    return this.toDTO(saved);
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
