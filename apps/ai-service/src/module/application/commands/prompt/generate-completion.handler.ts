import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { GenerateCompletionCommand } from './generate-completion.command';
import type { PromptServiceInterface } from '../../services/interfaces/prompt.service.interface';
import type { CompletionResponseDTO } from '../../dtos/responses/prompt-response.dto';

@CommandHandler(GenerateCompletionCommand)
export class GenerateCompletionHandler
  extends BaseCommandHandler<GenerateCompletionCommand, CompletionResponseDTO>
  implements ICommandHandler<GenerateCompletionCommand>
{
  readonly commandType = 'ai.prompt.generate-completion';
  constructor(
    private readonly promptService: PromptServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: GenerateCompletionCommand): Promise<CompletionResponseDTO> {
    return this.promptService.generateCompletion(command.input);
  }
}
