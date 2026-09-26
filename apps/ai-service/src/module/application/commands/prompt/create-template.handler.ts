import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateTemplateCommand } from './create-template.command';
import type { PromptTemplateServiceInterface } from '../../services/interfaces/prompt-template.service.interface';

@CommandHandler(CreateTemplateCommand)
export class CreateTemplateHandler
  extends BaseCommandHandler<CreateTemplateCommand, { readonly id: string }>
  implements ICommandHandler<CreateTemplateCommand>
{
  readonly commandType = 'ai.prompt.create-template';
  constructor(
    private readonly templateService: PromptTemplateServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: CreateTemplateCommand): Promise<{ readonly id: string }> {
    const entity = await this.templateService.create(command.input);
    return { id: entity.id.value };
  }
}
