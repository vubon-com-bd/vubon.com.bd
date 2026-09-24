import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateBroadcastCommand } from './create-broadcast.command';
import type { BroadcastResponseDTO } from '../../dtos/responses/broadcast-response.dto';
import type { BroadcastRepository } from '../../../domain/repositories/broadcast.repository.interface';
import { BroadcastEntity } from '../../../domain/entities/broadcast.entity';
import { BroadcastStatusVO } from '../../../domain/value-objects/primitives/broadcast-status.vo';
import { BroadcastTypeVO } from '../../../domain/value-objects/primitives/broadcast-type.vo';
import { BroadcastAudienceVO } from '../../../domain/value-objects/primitives/broadcast-audience.vo';
import { TemplateIdVO } from '../../../domain/value-objects/primitives/template-id.vo';

@CommandHandler(CreateBroadcastCommand)
export class CreateBroadcastHandler
  extends BaseCommandHandler<CreateBroadcastCommand, BroadcastResponseDTO>
  implements ICommandHandler<CreateBroadcastCommand>
{
  readonly commandType = 'broadcast.create';

  constructor(
    private readonly broadcastRepo: BroadcastRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateBroadcastCommand): Promise<BroadcastResponseDTO> {
    const entity = BroadcastEntity.create({
      type: BroadcastTypeVO.create(command.broadcastType),
      status: BroadcastStatusVO.create('draft'),
      audience: BroadcastAudienceVO.create(command.target),
      templateId: command.templateId ? TemplateIdVO.create(command.templateId) : null,
      subject: command.subject ?? null,
      content: command.content,
      scheduledAt: command.scheduledAt ? new Date(command.scheduledAt) : null,
      startedAt: null,
      completedAt: null,
    });

    const saved = await this.broadcastRepo.save(entity);
    void this.eventBus;

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
