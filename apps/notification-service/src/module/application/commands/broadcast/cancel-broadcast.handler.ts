import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CancelBroadcastCommand } from './cancel-broadcast.command';
import type { BroadcastRepository } from '../../../domain/repositories/broadcast.repository.interface';
import { BroadcastEntity } from '../../../domain/entities/broadcast.entity';
import { BroadcastIdVO } from '../../../domain/value-objects/primitives/broadcast-id.vo';
import { BroadcastStatusVO } from '../../../domain/value-objects/primitives/broadcast-status.vo';

@CommandHandler(CancelBroadcastCommand)
export class CancelBroadcastHandler
  extends BaseCommandHandler<CancelBroadcastCommand, void>
  implements ICommandHandler<CancelBroadcastCommand>
{
  readonly commandType = 'broadcast.cancel';

  constructor(private readonly broadcastRepo: BroadcastRepository) {
    super();
  }

  async execute(command: CancelBroadcastCommand): Promise<void> {
    const entity = await this.broadcastRepo.findById(BroadcastIdVO.create(command.broadcastId));
    if (!entity) throw new Error(`Broadcast not found: ${command.broadcastId}`);

    const cancelled = BroadcastEntity.reconstitute(
      entity.id,
      {
        type: entity.type,
        status: BroadcastStatusVO.create('cancelled'),
        audience: entity.audience,
        templateId: entity.templateId,
        subject: entity.subject,
        content: entity.content,
        scheduledAt: entity.scheduledAt,
        startedAt: entity.startedAt,
        completedAt: entity.completedAt,
      },
      entity.createdAt,
      new Date().toISOString(),
      entity.deletedAt ?? null,
    );

    await this.broadcastRepo.save(cancelled);
  }
}
