import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ExecutePromptCommand } from './execute-prompt.command';
import type { PromptServiceInterface } from '../../services/interfaces/prompt.service.interface';
import type { CompletionResponseDTO } from '../../dtos/responses/prompt-response.dto';

@CommandHandler(ExecutePromptCommand)
export class ExecutePromptHandler
  extends BaseCommandHandler<ExecutePromptCommand, CompletionResponseDTO>
  implements ICommandHandler<ExecutePromptCommand>
{
  readonly commandType = 'ai.prompt.execute';
  constructor(
    private readonly promptService: PromptServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: ExecutePromptCommand): Promise<CompletionResponseDTO> {
    return this.promptService.execute(command.input);
  }
}
