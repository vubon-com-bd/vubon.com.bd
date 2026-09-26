import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteEmbeddingCommand } from './delete-embedding.command';
import type { EmbeddingServiceInterface } from '../../services/interfaces/embedding.service.interface';

@CommandHandler(DeleteEmbeddingCommand)
export class DeleteEmbeddingHandler
  extends BaseCommandHandler<DeleteEmbeddingCommand, void>
  implements ICommandHandler<DeleteEmbeddingCommand>
{
  readonly commandType = 'ai.embedding.delete';
  constructor(
    private readonly embeddingService: EmbeddingServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: DeleteEmbeddingCommand): Promise<void> {
    await this.embeddingService.delete(command.sourceId, command.sourceType);
  }
}
