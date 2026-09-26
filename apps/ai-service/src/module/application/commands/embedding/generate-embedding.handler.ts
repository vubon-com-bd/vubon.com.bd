import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { GenerateEmbeddingCommand } from './generate-embedding.command';
import type { EmbeddingServiceInterface } from '../../services/interfaces/embedding.service.interface';
import type { EmbeddingResponseDTO } from '../../dtos/responses/embedding-response.dto';

@CommandHandler(GenerateEmbeddingCommand)
export class GenerateEmbeddingHandler
  extends BaseCommandHandler<GenerateEmbeddingCommand, EmbeddingResponseDTO>
  implements ICommandHandler<GenerateEmbeddingCommand>
{
  readonly commandType = 'ai.embedding.generate';
  constructor(
    private readonly embeddingService: EmbeddingServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: GenerateEmbeddingCommand): Promise<EmbeddingResponseDTO> {
    return this.embeddingService.generate(command.input);
  }
}
