import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { BatchEmbeddingCommand } from './batch-embedding.command';
import type { EmbeddingServiceInterface } from '../../services/interfaces/embedding.service.interface';
import type { EmbeddingBatchResponseDTO } from '../../dtos/responses/embedding-response.dto';

@CommandHandler(BatchEmbeddingCommand)
export class BatchEmbeddingHandler
  extends BaseCommandHandler<BatchEmbeddingCommand, EmbeddingBatchResponseDTO>
  implements ICommandHandler<BatchEmbeddingCommand>
{
  readonly commandType = 'ai.embedding.batch';
  constructor(
    private readonly embeddingService: EmbeddingServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: BatchEmbeddingCommand): Promise<EmbeddingBatchResponseDTO> {
    return this.embeddingService.generateBatch(command.input);
  }
}
