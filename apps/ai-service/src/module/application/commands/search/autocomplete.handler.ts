import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AutocompleteCommand } from './autocomplete.command';
import type { AiSearchServiceInterface } from '../../services/interfaces/ai-search.service.interface';

@CommandHandler(AutocompleteCommand)
export class AutocompleteHandler
  extends BaseCommandHandler<AutocompleteCommand, readonly string[]>
  implements ICommandHandler<AutocompleteCommand>
{
  readonly commandType = 'ai.search.autocomplete';
  constructor(
    private readonly searchService: AiSearchServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: AutocompleteCommand): Promise<readonly string[]> {
    return this.searchService.autocomplete(command.input.prefix, command.input.limit);
  }
}
