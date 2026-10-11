import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendEmailWithTemplateCommand } from './send-email-with-template.command.js';
import { EMAIL_SERVICE, type IEmailService } from '../../services/interfaces/email.service.interface.js';
import type { EmailSendResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@CommandHandler(SendEmailWithTemplateCommand)
export class SendEmailWithTemplateHandler
  implements ICommandHandler<SendEmailWithTemplateCommand, EmailSendResponseDTO>
{
  constructor(@Inject(EMAIL_SERVICE) private readonly service: IEmailService) {}

  async execute(c: SendEmailWithTemplateCommand): Promise<EmailSendResponseDTO> {
    return this.service.sendWithTemplate(c.dto, c.actorId);
  }
}
