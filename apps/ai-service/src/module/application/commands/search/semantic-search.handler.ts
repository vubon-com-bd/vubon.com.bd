import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SemanticSearchCommand } from './semantic-search.command';
import type { AiSearchServiceInterface } from '../../services/interfaces/ai-search.service.interface';
import type { SearchResponseDTO } from '../../dtos/responses/search-response.dto';

@CommandHandler(SemanticSearchCommand)
export class SemanticSearchHandler
  extends BaseCommandHandler<SemanticSearchCommand, SearchResponseDTO>
  implements ICommandHandler<SemanticSearchCommand>
{
  readonly commandType = 'ai.search.semantic';
  constructor(
    private readonly searchService: AiSearchServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: SemanticSearchCommand): Promise<SearchResponseDTO> {
    return this.searchService.semantic(command.input);
  }
}
