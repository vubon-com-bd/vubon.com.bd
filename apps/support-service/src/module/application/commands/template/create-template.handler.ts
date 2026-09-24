import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateTemplateCommand } from './create-template.command';
import type { TemplateServiceInterface } from '../../services/interfaces/template.service.interface';

@CommandHandler(CreateTemplateCommand)
export class CreateTemplateHandler
  extends BaseCommandHandler<CreateTemplateCommand, { id: string }>
  implements ICommandHandler<CreateTemplateCommand>
{
  readonly commandType = 'support.template.create';

  constructor(private readonly templateService: TemplateServiceInterface) {
    super();
  }

  async execute(command: CreateTemplateCommand): Promise<{ id: string }> {
    return this.templateService.create({
      name: command.name,
      type: command.type_,
      content: command.content,
      variables: [...command.variables],
    });
  }
}
