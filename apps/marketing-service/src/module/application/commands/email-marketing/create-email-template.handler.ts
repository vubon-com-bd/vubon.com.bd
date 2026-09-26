import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateEmailTemplateCommand } from './create-email-template.command';
import type { EmailTemplateServiceInterface } from '../../services/interfaces/email-template.service.interface';
import type { EmailTemplateResponseDTO } from '../../dtos/responses/email-template-response.dto';

@CommandHandler(CreateEmailTemplateCommand)
export class CreateEmailTemplateHandler
  extends BaseCommandHandler<CreateEmailTemplateCommand, EmailTemplateResponseDTO>
  implements ICommandHandler<CreateEmailTemplateCommand>
{
  readonly commandType = 'marketing.email-marketing.create-template';

  constructor(private readonly service: EmailTemplateServiceInterface) {
    super();
  }

  async execute(command: CreateEmailTemplateCommand): Promise<EmailTemplateResponseDTO> {
    return this.service.create({
      name: command.name,
      subject: command.subject,
      html: command.html,
      language: command.language,
    });
  }
}
