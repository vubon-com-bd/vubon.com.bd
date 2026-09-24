import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateTemplateCommand } from './update-template.command';
import type { SupportTemplateRepository } from '../../../domain/repositories/support-template.repository.interface';
import { TemplateIdVO } from '../../../domain/value-objects/primitives/template-id.vo';

@CommandHandler(UpdateTemplateCommand)
export class UpdateTemplateHandler
  extends BaseCommandHandler<UpdateTemplateCommand, void>
  implements ICommandHandler<UpdateTemplateCommand>
{
  readonly commandType = 'support.template.update';

  constructor(private readonly templateRepo: SupportTemplateRepository) {
    super();
  }

  async execute(command: UpdateTemplateCommand): Promise<void> {
    const existing = await this.templateRepo.findById(
      TemplateIdVO.create(command.templateId),
    );
    if (!existing) return;
  }
}
