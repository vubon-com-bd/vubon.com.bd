import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SearchVectorCommand } from './search-vector.command';
import type { VectorServiceInterface } from '../../services/interfaces/vector.service.interface';
import type { VectorSearchResponseDTO } from '../../dtos/responses/vector-response.dto';

@CommandHandler(SearchVectorCommand)
export class SearchVectorHandler
  extends BaseCommandHandler<SearchVectorCommand, VectorSearchResponseDTO>
  implements ICommandHandler<SearchVectorCommand>
{
  readonly commandType = 'ai.vector.search';
  constructor(
    private readonly vectorService: VectorServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: SearchVectorCommand): Promise<VectorSearchResponseDTO> {
    return this.vectorService.search(command.input);
  }
}
