import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { HybridSearchCommand } from './hybrid-search.command';
import type { AiSearchServiceInterface } from '../../services/interfaces/ai-search.service.interface';
import type { SearchResponseDTO } from '../../dtos/responses/search-response.dto';

@CommandHandler(HybridSearchCommand)
export class HybridSearchHandler
  extends BaseCommandHandler<HybridSearchCommand, SearchResponseDTO>
  implements ICommandHandler<HybridSearchCommand>
{
  readonly commandType = 'ai.search.hybrid';
  constructor(
    private readonly searchService: AiSearchServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: HybridSearchCommand): Promise<SearchResponseDTO> {
    return this.searchService.hybrid(command.input);
  }
}
