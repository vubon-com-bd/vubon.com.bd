import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { StartBroadcastCommand } from './start-broadcast.command';
import type { BroadcastResponseDTO } from '../../dtos/responses/broadcast-response.dto';
import type { BroadcastRepository } from '../../../domain/repositories/broadcast.repository.interface';
import { BroadcastIdVO } from '../../../domain/value-objects/primitives/broadcast-id.vo';
import { BroadcastStartedEvent } from '../../../domain/events/broadcast.events';

@CommandHandler(StartBroadcastCommand)
export class StartBroadcastHandler
  extends BaseCommandHandler<StartBroadcastCommand, BroadcastResponseDTO>
  implements ICommandHandler<StartBroadcastCommand>
{
  readonly commandType = 'broadcast.start';

  constructor(
    private readonly broadcastRepo: BroadcastRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: StartBroadcastCommand): Promise<BroadcastResponseDTO> {
    const entity = await this.broadcastRepo.findById(BroadcastIdVO.create(command.broadcastId));
    if (!entity) throw new Error(`Broadcast not found: ${command.broadcastId}`);

    const started = entity.start();
    const saved = await this.broadcastRepo.save(started);
    const startedAt = saved.startedAt ?? new Date();

    // ✅ FIXED: 4 args (aggregateId, broadcastId, startedAt, version)
    await this.eventBus.publish(
      new BroadcastStartedEvent(saved.id.value, saved.id, startedAt, 0),
    );

    return {
      id: saved.id.value,
      type: saved.type.value,
      status: saved.status.value,
      target: saved.audience.value,
      content: saved.content,
      scheduledAt: saved.scheduledAt?.toISOString() ?? null,
      startedAt: saved.startedAt?.toISOString() ?? null,
      completedAt: saved.completedAt?.toISOString() ?? null,
      createdAt: saved.createdAt,
    };
  }
}
