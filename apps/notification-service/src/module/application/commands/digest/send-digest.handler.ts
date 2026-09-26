import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendDigestCommand } from './send-digest.command';
import type { DigestResponseDTO } from '../../dtos/responses/digest-response.dto';
import type { DigestRepository } from '../../../domain/repositories/digest.repository.interface';
import { DigestIdVO } from '../../../domain/value-objects/primitives/digest-id.vo';
import { DigestGeneratedEvent } from '../../../domain/events/digest.events';

@CommandHandler(SendDigestCommand)
export class SendDigestHandler
  extends BaseCommandHandler<SendDigestCommand, DigestResponseDTO>
  implements ICommandHandler<SendDigestCommand>
{
  readonly commandType = 'digest.send';

  constructor(
    private readonly digestRepo: DigestRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SendDigestCommand): Promise<DigestResponseDTO> {
    const entity = await this.digestRepo.findById(DigestIdVO.create(command.digestId));
    if (!entity) throw new Error(`Digest not found: ${command.digestId}`);

    const sent = entity.markAsSent();
    const saved = await this.digestRepo.save(sent);

    // ✅ FIXED: 4 args (aggregateId, digestId, itemCount, version)
    await this.eventBus.publish(
      new DigestGeneratedEvent(saved.id.value, saved.id, 0, 0),
    );

    return {
      id: saved.id.value,
      userId: saved.userId.value,
      type: saved.type.value,
      frequency: saved.period.value,
      status: saved.status.value,
      scheduledAt: saved.scheduledAt.toISOString(),
      sentAt: saved.sentAt?.toISOString() ?? null,
      itemCount: 0,
    };
  }
}
